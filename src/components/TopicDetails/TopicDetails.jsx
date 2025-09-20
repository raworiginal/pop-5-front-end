import { useState, useEffect, useContext } from "react";
import * as topicService from "../../services/topicService";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import ListsIndex from "../ListsIndex/ListsIndex";
import { IoEllipsisHorizontalCircleSharp } from "react-icons/io5";

const TopicDetails = () => {
	const { topicId } = useParams();
	const { user } = useContext(UserContext);
	const [topic, setTopic] = useState(null);
	const [lists, setLists] = useState(null);

	useEffect(() => {
		const fetchTopic = async () => {
			try {
				const topicData = await topicService.show(topicId);
				setTopic(topicData);
			} catch (error) {
				console.error(error);
			}
		};
		fetchTopic();
	}, [topicId]);

	if (!topic) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			<div className="hero bg-secondary min-h-1/2">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl text-secondary-content font-bold">
							{topic.title}
						</h1>
						<p className="py-6 text-secondary-content">{topic.description}</p>
						<button className="btn btn-primary">Add Your Top 5</button>
						{user.id === topic.owner.id && (
							<>
								<Link
									className="btn btn-warning"
									to={`/topics/${topic.id}/edit`}>
									edit
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			<h1>Here Is the Topic Deatils</h1>
			<ListsIndex topicId={topicId} lists={lists} setLists={setLists} />
		</>
	);
};
export default TopicDetails;
