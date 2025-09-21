import { useEffect, useState } from "react";
import * as topicService from "../../services/topicService";
import * as apiService from "../../services/apiService";
import { useParams } from "react-router";

const ListForm = ({ topic, setTopic }) => {
	const { topicId } = useParams();

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
	}, [topicId]);

	const [searchData, setSearchData] = useState({
		query: "",
	});
	const [formData, setFormData] = useState([]);
	const [searchResults, setSearchResults] = useState(null);
	const [selectedResult, setSelectedResult] = useState(null);

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
		setSearchResults(null);
		setSelectedResult(null);
	};

	const addResultToForm = (result) => {
		if (formData.every((item) => item.external_id !== result.id)) {
			result.external_id = result.id;
			delete result.id;
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
							required
							name="query"
							type="text"
							className="input"
							placeholder="The Matrix"
						/>

						<label className="label">Year</label>
						<input
							onChange={handleChange}
							name="year"
							type="number"
							maxLength={4}
							className="input"
							placeholder="i.e. 1999"
						/>

						<button className="btn btn-neutral mt-4">Search</button>
					</fieldset>
				</form>
			</search>
			<main className="flex justify-center-safe">
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-med border p-4">
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
