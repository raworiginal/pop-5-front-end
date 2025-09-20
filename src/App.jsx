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

	return (
		<>
			<NavBar />
			{/* Add the Routes component to wrap our individual routes*/}
			<Routes>
				<Route path="/" element={user ? <Dashboard /> : <Landing />} />
				<Route
					path="/topics/new"
					element={<TopicForm handleAddTopic={handleAddTopic} />}
				/>
				<Route path="/sign-up" element={<SignUpForm />} />
				<Route path="/sign-in" element={<SignInForm />} />
			</Routes>
		</>
	);
};

export default App;
