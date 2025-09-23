import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as topicService from "../../services/topicService";
import Loading from "../Placeholders/Loading";

const Dashboard = () => {
	const { user } = useContext(UserContext);
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		const fetchTopics = async () => {
			try {
				const fetchedTopics = await topicService.index();
				setTopics(fetchedTopics);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTopics();
	}, [user]);
	if (!topics)
		return (
			<>
				<div>
					<Loading />
				</div>
			</>
		);
	return (
		<>
			<main>
				<div className="hero glass bg-secondary">
					<div className="hero-content text-center">
						<div className="max-w-md p-2 bg-primary glass rounded-box">
							<h1 className="text-9xl font-bold text-primary-content rampart">
								POP 5!
							</h1>
							<p className="py-6"></p>
							<Link className="btn" to={"/topics/new"}>
								Add a Topic
							</Link>
						</div>
					</div>
				</div>
				<div className="flex justify-center">
					<ul className="list">
						<li className="p-4 pb-2 rampart font-bold text-4xl text-shadow-lg text-center">
							Most Recent Topics
						</li>
						<div className="glass rounded-box">
							{topics.map((topic) => (
								<li key={topic.id} className="list-row border-b-4">
									<div>
										<img
											className="size-10 rounded-box"
											src={`https://robohash.org/${topic.owner.username}?set=${
												(topic.owner.id % 4) + 1
											}`}
										/>
									</div>
									<Link to={`/topics/${topic.id}`} key={topic.id}>
										<div className="chat-bubble">
											<p>{topic.title}</p>
											<div className="text-xs uppercase font-semibold opacity-60">
												{topic.owner.username}
											</div>
										</div>
									</Link>
								</li>
							))}
						</div>
					</ul>
				</div>
			</main>
		</>
	);
};

export default Dashboard;
