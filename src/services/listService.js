const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const create = async (topicId, newListData) => {
	try {
		const res = await fetch(`${BASE_URL}/topics/${topicId}/lists`, {
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
		const res = await fetch(`${BASE_URL}/topics/${topicId}/lists`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		return res.json();
	} catch (error) {
		console.log(error);
	}
};

const show = async (listId) => {
	try {
		const res = await fetch(`${BASE_URL}/lists/${listId}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		return res.json();
	} catch (error) {
		console.error(error);
	}
};

const update = async (listId, updatedListData) => {
	try {
		const res = await fetch(`${BASE_URL}/lists/${listId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedListData),
		});
		return res.json();
	} catch (error) {
		console.error(error);
	}
};

export { index, create, show, update };
