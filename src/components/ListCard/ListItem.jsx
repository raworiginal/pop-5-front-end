import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";
const ListItem = ({
	item,
	index,
	moveItemRankDown,
	moveItemRankUp,
	isForm,
	removeItemFromList,
}) => {
	return (
		<li className="list-row border-b-2 p-1">
			<div className="text-4xl tabular-nums">{index + 1}</div>
			<div>
				<img
					className="max-w-10 aspect-auto rounded-box"
					src={item.poster_path}
				/>
			</div>
			<div className="list-col-grow">
				<div>{item.title}</div>
				<div>{item.release_date.slice(0, 4)}</div>
			</div>
			{isForm && (
				<div>
					{index !== 0 && (
						<button
							onClick={() => {
								moveItemRankUp(index);
							}}
							className="btn btn-xs  btn-primary">
							<FaArrowUp />
						</button>
					)}
					{index !== 4 && index > 0 && (
						<button
							onClick={() => moveItemRankDown(index)}
							className="btn btn-xs  btn-success">
							<FaArrowDown />
						</button>
					)}
					<button
						onClick={() => removeItemFromList(index)}
						className="btn btn-xs btn-neutral">
						<FaTrash />
					</button>
				</div>
			)}
		</li>
	);
};

export default ListItem;
