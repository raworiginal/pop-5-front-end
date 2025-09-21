import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as topicService from "../../services/topicService";

const TopicForm = ({ handleAddTopic, handleUpdateTopic }) => {
	const { topicId } = useParams();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
	});

	const categories = ["movies"];

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (topicId) {
			handleUpdateTopic(topicId, formData);
		} else {
			handleAddTopic(formData);
		}
	};

	useEffect(() => {
		const fetchTopic = async () => {
			const topicData = await topicService.show(topicId);
			setFormData(topicData);
		};
		if (topicId) fetchTopic();
		return () => setFormData({ title: "", description: "", category: "" });
	}, [topicId]);

	return (
		<main className="flex justify-center-safe">
			<form onSubmit={handleSubmit}>
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
					<legend className="fieldset-legend">
						{topicId ? "Edit Topic" : "Create Topic"}
					</legend>

					<label className="label">Top 5...</label>
					<textarea
						required
						name="title"
						type="text"
						value={formData.title}
						className="textarea"
						placeholder="children's movies that deeply tramatized you"
						onChange={handleChange}
					/>

					<label className="label">description</label>
					<textarea
						type="text"
						name="description"
						className="textarea textarea"
						placeholder="tell us what you mean, king"
						value={formData.description}
						onChange={handleChange}
					/>

					<label className="label">category</label>
					<select
						className="select"
						name="category"
						onChange={handleChange}
						value={formData.category}
						required>
						<option value={""} disabled>
							pick a category
						</option>
						{categories.map((category, index) => (
							<option value={category.toLowerCase()} key={index}>
								{category}
							</option>
						))}
					</select>

					<button className="btn btn-secondary" type="submit">
						{topicId ? "EDIT" : "CREATE"}
					</button>
				</fieldset>
			</form>
		</main>
	);
};

export default TopicForm;
