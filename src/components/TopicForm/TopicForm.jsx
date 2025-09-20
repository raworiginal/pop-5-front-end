import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as TopicService from "../../services/topicService";

const TopicForm = ({ handleAddTopic }) => {
	const { topicId } = useParams();

	const [formData, SetFormData] = useState({
		title: "",
		description: "",
		category: "",
	});

	const categories = ["movies"];

	const handleChange = (event) => {
		SetFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (topicId) {
			return;
		}
		handleAddTopic(formData);
	};

	return (
		<main className="flex justify-center-safe">
			<form onSubmit={handleSubmit}>
				<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
					<legend className="fieldset-legend">Create a Topic</legend>

					<label className="label">Top 5...</label>
					<textarea
						required
						name="title"
						type="text"
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
						SUBMIT
					</button>
				</fieldset>
			</form>
		</main>
	);
};

export default TopicForm;
