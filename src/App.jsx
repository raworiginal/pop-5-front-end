// src/App.jsx
import { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router"; // Import React Router
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import TopicForm from "./components/TopicForm/TopicForm";
import TopicDetails from "./components/TopicDetails/TopicDetails";
import * as topicService from "./services/topicService.js";

const App = () => {
	const { user } = useContext(UserContext);
	const [topics, setTopics] = useState([]);
	const navigate = useNavigate();

	const handleAddTopic = async (topicFormData) => {
		const newTopic = await topicService.create(topicFormData);
		setTopics([newTopic, ...topics]);
		navigate("/");
	};

	const handleUpdateTopic = async (topicId, topicFormData) => {
		const updatedTopic = await topicService.update(topicId, topicFormData);
		setTopics(
			topics.map((topic) => (topicId === topic.id ? updatedTopic : topic))
		);
		navigate(`/topics/${topicId}`);
	};

	return (
		<>
			<NavBar />
			{/* Add the Routes component to wrap our individual routes*/}
			<Routes>
				<Route
					path="/"
					element={
						user ? (
							<Dashboard topics={topics} setTopics={setTopics} />
						) : (
							<Landing />
						)
					}
				/>
				<Route
					path="/topics/new"
					element={<TopicForm handleAddTopic={handleAddTopic} />}
				/>
				<Route
					path="/topics/:topicId/edit"
					element={<TopicForm handleUpdateTopic={handleUpdateTopic} />}
				/>
				<Route path="/topics/:topicId" element={<TopicDetails />} />
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/sign-in" element={<SignInForm />} />
			</Routes>
		</>
	);
};

export default App;
