const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/topics`;

const index = async (topicId) => {
	try {
		const res = await fetch(`${BASE_URL}/${topicId}/lists`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export { index };
