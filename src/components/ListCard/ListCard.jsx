import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import * as listService from "../../services/listService";

const ListCard = ({ topic, list, setLists, lists }) => {
	const { user } = useContext(UserContext);

	const handleDeleteList = async () => {
		try {
			console.log(`Deleting ${list.author.username}'s list id ${list.id}...`);
			await listService.deleteList(list.id);
			setLists(lists.filter((item) => item.id !== list.id));
			console.log("Success");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<article className="card card-border w-sm mx-auto">
				<header className="flex">
					<h2 className="card-title">{`${list.author.username}'s Top 5 ${topic.title}`}</h2>
					{user.id === list.author.id && (
						<section className="card-actions justify-end">
							<Link to={`lists/${list.id}`} className="btn btn-info">
								Edit
							</Link>
							<button onClick={handleDeleteList} className="btn btn-warning">
								Delete
							</button>
						</section>
					)}
				</header>

				<ul className="list bg-base-100 rounded-box shadow-md">
					{list.items.map((item) => (
						<li className="list-row">
							<div className="text-4xl tabular-nums">{item.rank}</div>
							<div>
								<img
									className="max-w-10 aspect-auto rounded-box"
									src={item.poster_path}
								/>
							</div>
							<div className="list-col-grow">
								<div>{item.title}</div>
								<div>{item.release_date.slice(0, 4)}</div>
								<div className="text-xs uppercase font-semibold opacity-60">
									notes: {item.notes}
								</div>
							</div>
						</li>
					))}
				</ul>
				<section className="card-body"></section>
			</article>
		</>
	);
};

export default ListCard;
