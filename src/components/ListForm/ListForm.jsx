import { useEffect, useState } from "react";
import * as topicService from "../../services/topicService";
import * as apiService from "../../services/apiService";
import * as listService from "../../services/listService";
import { useNavigate, useParams } from "react-router";

const ListForm = () => {
	const { topicId } = useParams();
	const { listId } = useParams();
	const [topic, setTopic] = useState(null);
	const navigate = useNavigate();

	const [searchData, setSearchData] = useState({
		query: "",
		year: "",
	});
	const [formData, setFormData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedResult, setSelectedResult] = useState(null);

	useEffect(() => {
		const fetchTopic = async () => {
			try {
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
				console.log(listData);
				setFormData(listData.items);
			} catch (error) {
				console.error(error);
			}
		};
		fetchList();
	}, []);

	const handleAddList = async (newListData) => {
		try {
			const newList = { list_items: newListData };
			await listService.create(topic.id, newList);
			navigate(`/topics/${topic.id}`);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateList = async (updatedListData) => {
		try {
			const updatedList = { list_items: updatedListData };
			console.log(updatedList);
			await listService.update(listId, updatedList);
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

	if (!topic) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			<search className="flex justify-center-safe">
				<form onSubmit={handleSearch}>
					<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
						<legend className="fieldset-legend">Movie Search</legend>

						<label className="label">SEARCH</label>
						<input
							onChange={handleChange}
							value={searchData.query}
							required
							name="query"
							type="text"
							className="input"
							placeholder="The Matrix"
						/>

						<label className="label">Year (optional)</label>
						<input
							onChange={handleChange}
							name="year"
							type="number"
							className="input"
							placeholder="i.e. 1999"
						/>

						<button className="btn btn-neutral mt-4">Search</button>
					</fieldset>
				</form>
			</search>
			<main className="flex justify-center-safe">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-med p-4">
					<legend className="fieldset-legend">{`Your Top 5 ${topic.title}`}</legend>
					{formData.map((item, index) => (
						<div key={index} className="flex  max-h-25">
							<p className="text-8xl">{index + 1}</p>
							<img className="aspect-auto" src={item.poster_path} alt="" />
							<h2 className="text-4xl">{item.title}</h2>
							<input className="input" type="text" />

							<button
								onClick={() => removeResultFromForm(index)}
								className="btn btn-primary btn-circle">
								x
							</button>
						</div>
					))}
					{listId ? (
						<button onClick={() => handleUpdateList(formData)} className="btn">
							Edit List
						</button>
					) : (
						<button onClick={() => handleAddList(formData)} className="btn">
							Create List
						</button>
					)}
				</fieldset>
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
