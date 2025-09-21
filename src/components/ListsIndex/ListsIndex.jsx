import { useContext, useEffect } from "react";
import * as listService from "../../services/listService";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router";
import ListCard from "../ListCard/ListCard";

const ListsIndex = ({ topicId, lists, setLists }) => {
	const { user } = useContext;

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
			<h1>All The Lists for Topic {topicId} go here</h1>
			<ul>
				{lists.map((list) => (
					<ListCard key={list.id} list={list} />
				))}
			</ul>
		</>
	);
};

export default ListsIndex;
