import { useState } from "react";
import * as apiService from "../../services/apiService";

const ListForm = () => {
	const [searchData, setSearchData] = useState({
		query: "",
	});
	const [formData, setFormData] = useState([]);
	const [searchResults, setSearchResults] = useState(null);
	const fetchSearchReults = async () => {
		try {
			console.log(searchData);
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
		console.log(searchData);
	};

	const convertDateString = (dateString) => {
		const convertedDateString = new Date(dateString);
		return convertedDateString.toLocaleDateString("en-US");
	};

	const closeSearchModal = () => {
		document.getElementById("search-results").close();
		setSearchResults(null);
	};

	const addToList = () => {
		console.log();
	};
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
						<button className="btn">Add Selected</button>
					</div>
				</div>
			</dialog>
		</>
	);
};

export default ListForm;
