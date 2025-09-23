import { useEffect } from "react";
import * as listService from "../../services/listService";
import { useParams } from "react-router";
import ListCard from "../ListCard/ListCard";
import EmptyBox from "../Placeholders/EmptyBox";

const ListsIndex = ({ handleDeleteList, topic, lists, setLists }) => {
	if (!lists) {
		return (
			<span className="loading loading-ring loading-xl text-warning"></span>
		);
	}

	return (
		<>
			{lists.length === 0 ? (
				<div className="card w-sm mx-auto m-4">
					<EmptyBox />
				</div>
			) : (
				<ul>
					{lists.map((list) => (
						<ListCard
							lists={lists}
							setLists={setLists}
							key={list.id}
							topic={topic}
							list={list}
							handleDeleteList={handleDeleteList}
						/>
					))}
				</ul>
			)}
		</>
	);
};

export default ListsIndex;
