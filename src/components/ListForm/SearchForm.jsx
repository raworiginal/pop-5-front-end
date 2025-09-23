const SearchForm = ({ handleChange, handleSearch, searchData }) => {
	return (
		<search className="flex justify-center-safe">
			<form onSubmit={handleSearch}>
				<fieldset className="bg-primary border-base-300 rounded-box w-sm border p-4">
					<h2 className="text-2xl text-primary-content">Movie Search</h2>

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
	);
};

export default SearchForm;
