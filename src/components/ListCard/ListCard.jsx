import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import ListItem from "./ListItem";
import EmptyBox from "../Placeholders/EmptyBox";

const ListCard = ({
	topic,
	list,
	isForm,
	moveItemRankDown,
	moveItemRankUp,
	removeItemFromList,
	handleDeleteList,
}) => {
	const { user } = useContext(UserContext);

	return (
		<>
			<article className="glass card card-border w-sm mx-auto p-4">
				{!isForm && (
					<>
						{user.id === list.author.id && (
							<section className="card-actions bg-primary justify-end">
								<div className="join">
									<Link to={`lists/${list.id}`} className="btn btn-info btn-xs">
										Edit
									</Link>
									<button
										onClick={handleDeleteList}
										className="btn btn-xs btn-warning">
										Delete
									</button>
								</div>
							</section>
						)}
					</>
				)}
				<header className="bg-neutral">
					{isForm ? (
						<h1 className="text-2xl text-neutral-content font-extrabold">
							Your Top Five
						</h1>
					) : (
						<div className="p-2 bg-neutral w-full">
							<h2 className="text-neutral-content text-shadow-lg uppercase">{`${list.author.username}`}</h2>
							<p className="text-neutral-content">{"Top 5:"}</p>
							<p className="text-neutral-content text-shadow-md">
								{topic.title}
							</p>
						</div>
					)}
				</header>
				<main className="card-body bg-secondary">
					{list.items.length === 0 ? (
						<EmptyBox />
					) : (
						<ul className="list bg-base-100 rounded-box shadow-md">
							{list.items.map((item, index) => (
								<ListItem
									key={index}
									item={item}
									index={index}
									moveItemRankDown={moveItemRankDown}
									moveItemRankUp={moveItemRankUp}
									removeItemFromList={removeItemFromList}
									isForm={isForm}
								/>
							))}
						</ul>
					)}
				</main>
			</article>
		</>
	);
};

export default ListCard;
