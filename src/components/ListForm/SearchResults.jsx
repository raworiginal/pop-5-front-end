const SearchResults = ({
	searchResults,
	selectedResult,
	handleChangeSelection,
	addResultToForm,
	closeSearchModal,
}) => {
	const convertDateString = (dateString) => {
		const convertedDateString = new Date(dateString);
		return convertedDateString.toLocaleDateString("en-US");
	};
	if (!searchResults) return <h1>Loading...</h1>;

	return (
		<>
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
								searchResults.map((result, index) => (
									<tr key={result.id}>
										<th>
											<label>
												<input
													type="radio"
													onClick={() => handleChangeSelection(result)}
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
		</>
	);
};
export default SearchResults;
