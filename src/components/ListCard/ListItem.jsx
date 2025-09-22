import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
const ListItem = ({ item }) => {
	return (
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
			<div>
				<button
					onClick={() => {
						moveItemRankUp(index);
					}}
					className="btn btn-circle btn-primary text-xl">
					<FaArrowCircleUp />
				</button>
				<button
					onClick={() => moveItemRankDown(index)}
					className="btn btn-circle btn-primary text-xl">
					<FaArrowCircleDown />
				</button>
				<button
					onClick={() => removeResultFromForm(index)}
					className="btn btn-primary btn-circle">
					x
				</button>
			</div>
		</li>
	);
};

export default ListItem;
