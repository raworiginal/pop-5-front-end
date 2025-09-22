import { useEffect, useState } from "react";
import * as topicService from "../../services/topicService";
import * as apiService from "../../services/apiService";
import * as listService from "../../services/listService";
import { useNavigate, useParams } from "react-router";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import ListCard from "../ListCard/ListCard";
import ListItem from "../ListCard/ListItem";
import SearchForm from "./SearchForm";

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
	const [searchResults, setSearchResults] = useState([]);
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
		document.getElementById("search-results").showModal();
	};

	const handleChange = (event) => {
		setSearchData({ ...searchData, [event.target.name]: event.target.value });
	};

	const convertDateString = (dateString) => {
		const convertedDateString = new Date(dateString);
		return convertedDateString.toLocaleDateString("en-US");
	};

	const closeSearchModal = () => {
		document.getElementById("search-results").close();
		setSearchResults([]);
		setSelectedResult([]);
	};

	const addResultToForm = (result) => {
		if (formData.every((item) => item.ext_id !== result.id)) {
			result.ext_id = result.id;
			delete result.id;
			setSearchData({ query: "", year: "" });
			setFormData([...formData, { ...result, notes: "" }]);
		}
		closeSearchModal();
	};

	const removeResultFromForm = (index) => {
		formData.splice(index, 1);
		setFormData([...formData]);
	};

	const moveItemRankUp = (index) => {
		if (index > 0 && index < 5) {
			const updatedList = [...formData];
			[updatedList[index - 1], updatedList[index]] = [
				updatedList[index],
				updatedList[index - 1],
			];

			setFormData(updatedList);
		}
	};
	const moveItemRankDown = (index) => {
		if (index >= 0 && index < 4) {
			const updatedList = [...formData];
			[updatedList[index + 1], updatedList[index]] = [
				updatedList[index],
				updatedList[index + 1],
			];

			setFormData(updatedList);
		}
	};

	if (!topic) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			<SearchForm
				handleChange={handleChange}
				searchData={searchData}
				handleSearch={handleSearch}
			/>

			<main className="flex justify-center-safe">
				<ListCard list={formData} isForm={true} />
				{listId ? (
					<button onClick={() => handleUpdateList(formData)} className="btn">
						Edit List
					</button>
				) : (
					<button onClick={() => handleAddList(formData)} className="btn">
						Create List
					</button>
				)}
			</main>

			<dialog
				id="search-results"
				className="modal modal-bottom sm:modal-middle">
				<div className="modal-box min-w-340px">
					<div className="overflow-x-auto">
						<table className="table">
							<thead>
								<tr>
									<th></th>
									<th>poster</th>
									<th>title</th>
									<th>release date</th>
								</tr>
							</thead>
							<tbody>
								{searchResults &&
									searchResults.map((result) => (
										<tr>
											<th>
												<label>
													<input
														type="radio"
														onClick={() => setSelectedResult(result)}
														key={result.id}
														value={result.title}
														name="selection"
														className="radio"
													/>
												</label>
											</th>
											<td>
												<div className="avatar w-20">
													<img
														src={result.poster_path}
														alt={`movie poster for ${result.title}`}
													/>
												</div>
											</td>
											<td>{result.title}</td>
											<td>{convertDateString(result.release_date)}</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>

					<div className="modal-action">
						<button onClick={closeSearchModal} className="btn">
							Close
						</button>
						<button
							onClick={() => addResultToForm(selectedResult)}
							className="btn">
							Add Selected
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default ListForm;
