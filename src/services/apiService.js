const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api`;

const movieSearch = async (searchData) => {
	try {
		const res = await fetch(`${BASE_URL}/movies/search`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(searchData),
		});
		return res.json();
	} catch (error) {
		console.error(error);
	}
};

export { movieSearch };
