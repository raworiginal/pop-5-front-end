import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import ListItem from "./ListItem";
import EmptyBox from "../Placeholders/EmptyBox";
import Loading from "../Placeholders/Loading";

const ListCard = ({
	topic,
	list,
	isForm,
	moveItemRankDown,
	moveItemRankUp,
	removeItemFromList,
	handleDeleteList,
	listId,
}) => {
	const { user } = useContext(UserContext);

	const openConfirmDeleteModal = () => {
		document.getElementById("delete-confirm").showModal();
	};
	if (list.items.length === 0 && listId)
		return (
			<div>
				<Loading />
			</div>
		);
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
										onClick={() => openConfirmDeleteModal()}
										className="btn btn-xs btn-warning">
										Delete
									</button>
								</div>
								<dialog
									id="delete-confirm"
									className="modal modal-bottom sm:modal-middle">
									<div className="modal-box">
										<h3 className="font-bold text-lg">Confirm Delete!</h3>
										<p className="py-4">
											Are you sure you want to delete this list?
										</p>
										<div className="modal-action">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn btn-info">Close</button>
											<button
												onClick={() => handleDeleteList(list)}
												className="btn-error btn">
												Delete
											</button>
										</div>
									</div>
								</dialog>
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
									listLength={list.items.length}
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
