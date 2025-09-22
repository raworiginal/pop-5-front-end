import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import * as listService from "../../services/listService";
import ListItem from "./ListItem";

const ListCard = ({ topic, list, setLists, lists, isForm }) => {
	console.log(list);
	const { user } = useContext(UserContext);

	const handleDeleteList = async () => {
		try {
			await listService.deleteList(list.id);
			setLists(lists.filter((item) => item.id !== list.id));
		} catch (error) {
			console.error(error);
		}
	};
	if (list.length === 0 && isForm) return "Add to list";
	return (
		<>
			<article className="card card-border w-sm mx-auto">
				<header className="card-body flex">
					{!isForm && (
						<>
							<h2 className="card-title">{`${list.author.username}'s Top 5 ${topic.title}`}</h2>
							{user.id === list.author.id && (
								<section className="card-actions justify-end">
									<Link to={`lists/${list.id}`} className="btn btn-info">
										Edit
									</Link>
									<button
										onClick={handleDeleteList}
										className="btn btn-warning">
										Delete
									</button>
								</section>
							)}
						</>
					)}
				</header>
				<main className="card-body">
					<ul className="list bg-base-100 rounded-box shadow-md">
						{list.items.map((item) => (
							<ListItem item={item} />
						))}
					</ul>
				</main>
			</article>
		</>
	);
};

export default ListCard;
