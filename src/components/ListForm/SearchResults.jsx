import { FaBackward, FaExclamation } from "react-icons/fa";

const SearchResults = ({
	searchResults,
	selectedResult,
	handleChangeSelection,
	addResultToForm,
	closeSearchModal,
	items,
	clearSearchResults,
}) => {
	const convertDateString = (dateString) => {
		const convertedDateString = new Date(dateString);
		return convertedDateString.toLocaleDateString("en-US");
	};
	if (!searchResults) return <h1>Loading...</h1>;

	return (
		<>
			<div className="modal-box bg-primary border min-w-340px">
				{selectedResult &&
					items.some((item) => item.ext_id == selectedResult.id) && (
						<div role="alert" className="alert alert-warning">
							<FaExclamation />
							<span>selection is already in list</span>
						</div>
					)}
				<div className="overflow-x-auto">
					<table className="table table-xs bg-primary">
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
								searchResults.map((result, index) => (
									<tr key={result.id}>
										<th>
											<label>
												<input
													type="radio"
													onClick={() => handleChangeSelection(result)}
													value={result.title}
													name="selection"
													className="radio radio-neutral"
												/>
											</label>
										</th>
										<td>
											<div className="avatar w-10">
												<img
													src={result.poster_path}
													alt={`movie poster for ${result.title}`}
												/>
											</div>
										</td>
										<td className="text-md font-bold">{result.title}</td>
										<td>{convertDateString(result.release_date)}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				<div className="modal-action">
					<button onClick={clearSearchResults} class="btn">
						back to search
					</button>
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
		</>
	);
};
export default SearchResults;
