const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/topics`;

const create = async (topicId, newListData) => {
	try {
		const res = await fetch(`${BASE_URL}/${topicId}/lists`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newListData),
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

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

export { index, create };
