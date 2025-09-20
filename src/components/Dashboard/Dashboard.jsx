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
			<ul className="list bg-base-200">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Most Recent Topics
				</li>
				{topics.map((topic, index) => (
					<li key={topic.id} className="list-row">
						<div>
							<img
								className="size-10 rounded-box"
								src={`https://i.pravatar.cc/150?img=${index}`}
							/>
						</div>
						<div className="chat-bubble">
							<Link
								className="link link-neutral"
								to={`/topics/${topic.id}`}
								key={topic.id}>
								{topic.title}
							</Link>
							<div className="text-xs uppercase font-semibold opacity-60">
								{topic.owner.username}
							</div>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
};

export default Dashboard;
