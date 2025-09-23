import { useState, useEffect, useContext } from "react";
import * as topicService from "../../services/topicService";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import ListsIndex from "../ListsIndex/ListsIndex";
import * as listService from "../../services/listService";
import Loading from "../Placeholders/Loading";

const TopicDetails = () => {
	const { topicId } = useParams();
	const [topic, setTopic] = useState(null);
	const { user } = useContext(UserContext);
	const [lists, setLists] = useState([]);

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

	useEffect(() => {
		const fetchLists = async () => {
			try {
				const fetchedLists = await listService.index(topicId);
				setLists(fetchedLists);
			} catch (error) {
				console.error(error);
			}
		};
		fetchLists();
	}, [topicId]);

	const handleDeleteList = async (list) => {
		try {
			const updatedLists = lists.filter((item) => item.id !== list.id);
			setLists(updatedLists);
			await listService.deleteList(list.id);
		} catch (error) {
			console.error(error);
		}
	};

	if (!topic) {
		return (
			<div className="flex justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<>
			<div className="hero bg-secondary">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-2xl text-secondary-content font-bold">
							{topic.title}
						</h1>
						<p className="py-6 w-sm text-left text-secondary-content">
							{topic.description}
						</p>
						{lists.some((item) => item.author.id === user.id) || (
							<Link
								to={`/topics/${topicId}/lists/new`}
								className="btn btn-primary">
								Add Your Top 5
							</Link>
						)}
						{user.id === topic.owner.id && (
							<>
								<Link
									className="btn btn-warning"
									to={`/topics/${topic.id}/edit`}>
									edit topic
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
			<ListsIndex
				topic={topic}
				handleDeleteList={handleDeleteList}
				lists={lists}
				setLists={setLists}
			/>
		</>
	);
};

export default TopicDetails;
