import { useEffect } from "react";
import * as listService from "../../services/listService";
import { useParams } from "react-router";
import ListCard from "../ListCard/ListCard";

const ListsIndex = ({ topic, lists, setLists }) => {
	const { topicId } = useParams();
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

	if (!lists) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			<ul>
				{lists.map((list) => (
					<ListCard
						lists={lists}
						setLists={setLists}
						key={list.id}
						topic={topic}
						list={list}
					/>
				))}
			</ul>
		</>
	);
};

export default ListsIndex;
