import { useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import TopicForm from "./components/TopicForm/TopicForm";
import TopicDetails from "./components/TopicDetails/TopicDetails";
import ListForm from "./components/ListForm/ListForm";
import * as topicService from "./services/topicService.js";

const App = () => {
	//STATES & CONTEXT
	const { user } = useContext(UserContext);
	const [topics, setTopics] = useState([]);

	const navigate = useNavigate();

	const handleAddTopic = async (topicFormData) => {
		try {
			const newTopic = await topicService.create(topicFormData);
			setTopics([newTopic, ...topics]);
			navigate("/");
		} catch (error) {
			console.error;
		}
	};

	const handleUpdateTopic = async (topicId, topicFormData) => {
		try {
			const updatedTopic = await topicService.update(topicId, topicFormData);
			setTopics(
				topics.map((topic) => (topicId === topic.id ? updatedTopic : topic))
			);
			navigate(`/topics/${topicId}`);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<NavBar />

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
				<Route path="/topics/:topicId/lists/new" element={<ListForm />} />
				<Route path="/topics/:topicId/lists/:listId" element={<ListForm />} />
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/sign-in" element={<SignInForm />} />
			</Routes>
		</>
	);
};

export default App;
