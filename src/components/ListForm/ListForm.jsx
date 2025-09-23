import { useEffect, useState } from "react";
import * as topicService from "../../services/topicService";
import * as apiService from "../../services/apiService";
import * as listService from "../../services/listService";
import { useNavigate, useParams } from "react-router";
import ListCard from "../ListCard/ListCard";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const ListForm = () => {
	const { topicId } = useParams();
	const { listId } = useParams();
	const [topic, setTopic] = useState(null);
	const navigate = useNavigate();
	const [searchData, setSearchData] = useState({
		query: "",
		year: "",
	});

	const [formData, setFormData] = useState({ items: [] });
	const [searchResults, setSearchResults] = useState(null);
	const [selectedResult, setSelectedResult] = useState(null);

	useEffect(() => {
		const fetchTopic = async () => {
			try {
				console.log("...fetching topic");
				const topicData = await topicService.show(topicId);
				setTopic(topicData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTopic();
	}, []);

	useEffect(() => {
		const fetchList = async () => {
			try {
				const listData = await listService.show(listId);
				setFormData({ items: listData.items });
			} catch (error) {
				console.error(error);
			}
		};
		if (listId) fetchList();
	}, []);
	const handleChangeSelection = (result) => {
		setSelectedResult(result);
	};
	const handleAddList = async (newListData) => {
		try {
			// const newList = { items: newListData };
			await listService.create(topic.id, newListData);
			navigate(`/topics/${topic.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateList = async (updatedListData) => {
		try {
			await listService.update(listId, updatedListData);
			navigate(`/topics/${topic.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchSearchReults = async () => {
		try {
			const fetchedResults = await apiService.movieSearch(searchData);
			setSearchResults(fetchedResults);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = (event) => {
		event.preventDefault();
		fetchSearchReults();
	};
	const openSearchModel = () => {
		document.getElementById("search-modal").showModal();
	};
	const handleChange = (event) => {
		setSearchData({ ...searchData, [event.target.name]: event.target.value });
	};

	const closeSearchModal = () => {
		document.getElementById("search-modal").close();
		setSearchResults(null);
		setSelectedResult(null);
	};

	const clearSearchResuls = () => {
		setSearchResults(null);
	};

	const addResultToForm = (result) => {
		const currentList = [...formData.items];
		console.log(currentList);
		// I finally found a use for type coercision
		if (currentList.some((item) => item.ext_id == result.id)) {
			console.log(result);
			return console.log(`${result.id} is already in your list`);
		}
		result.ext_id = result.id;
		result.notes = "";
		delete result.id;
		const updatedItems = [...formData.items, result];
		setSearchData({ query: "", year: "" });
		setFormData({ items: updatedItems });
		closeSearchModal();
	};

	const removeItemFromList = (index) => {
		const items = [...formData.items];
		const updatedItems = items.filter((_, idx) => idx !== index);
		setFormData({ items: updatedItems });
	};

	const moveItemRankUp = (index) => {
		if (index > 0 && index < 5) {
			const updatedList = [...formData.items];
			[updatedList[index - 1], updatedList[index]] = [
				updatedList[index],
				updatedList[index - 1],
			];

			setFormData({ items: updatedList });
		}
	};
	const moveItemRankDown = (index) => {
		if (index >= 0 && index < 4) {
			const updatedList = [...formData.items];
			[updatedList[index + 1], updatedList[index]] = [
				updatedList[index],
				updatedList[index + 1],
			];

			setFormData({ items: updatedList });
		}
	};

	if (!topic) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			<section className="fieldset bg-secondary rounded-box w-sm mx-auto border p-4">
				<h2 className="text-xl text-secondary-content">{topic.title}</h2>
				<h2 className="mx-auto text-secondary-content text-xl">
					{formData.items.length}/5
				</h2>
				<progress
					className="progress progress-neutral"
					value={formData.items.length}
					max={5}></progress>
				<div className="flex items-center justify-center">
					{formData.items.length < 5 ? (
						<button
							className="btn btn-warning btn-wide"
							onClick={openSearchModel}>
							Add An Item
						</button>
					) : (
						<div>
							{listId ? (
								<button
									onClick={() => handleUpdateList(formData)}
									className="btn btn-success btn-sm">
									Submit Edited List
								</button>
							) : (
								<button
									onClick={() => handleAddList(formData)}
									className="btn btn-success btn-sm">
									Submit New List
								</button>
							)}
						</div>
					)}
				</div>
			</section>
			<main className="flex justify-center-safe">
				<ListCard
					list={formData}
					isForm={true}
					moveItemRankDown={moveItemRankDown}
					moveItemRankUp={moveItemRankUp}
					removeItemFromList={removeItemFromList}
				/>
			</main>

			<dialog
				id="search-modal"
				className="modal modal-bottom mx-auto sm:modal-middle">
				{searchResults ? (
					<SearchResults
						searchResults={searchResults}
						selectedResult={selectedResult}
						handleChangeSelection={handleChangeSelection}
						addResultToForm={addResultToForm}
						closeSearchModal={closeSearchModal}
					/>
				) : (
					<SearchForm
						handleChange={handleChange}
						searchData={searchData}
						handleSearch={handleSearch}
					/>
				)}
			</dialog>
		</>
	);
};

export default ListForm;
