import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as topicService from "../../services/topicService";

const Dashboard = () => {
	const { user } = useContext(UserContext);
	const [topics, settopics] = useState([]);
	useEffect(() => {
		const fetchtopics = async () => {
			try {
				const fetchedtopics = await topicService.index();
				settopics(fetchedtopics);
			} catch (err) {
				console.log(err);
			}
		};
		if (user) fetchtopics();
	}, [user]);

	return (
		<main>
			<h1>Welcome, {user.username}</h1>
			<p>
				This is the dashboard page where you can see a list of all the topics.
			</p>
			<Link className="btn" to={"/topics/new"}>
				Add a Topic
			</Link>
			<ul>
				{topics.map((topic) => {
					return <li key={topic.id}>{topic.title}</li>;
				})}
			</ul>
		</main>
	);
};

export default Dashboard;
