import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as TopicsService from "../../services/topicsService";

const TopicForm = (props) => {
	const { topicId } = useParams();
	const [formData, SetFormData] = useState({
		title: "",
		description: "",
		category: "movies",
	});

	return (
		<main>
			<h1>Here lies the form of topics creating</h1>
		</main>
	);
};

export default TopicForm;
