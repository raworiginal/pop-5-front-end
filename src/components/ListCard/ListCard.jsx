const ListCard = ({ list }) => {
	return (
		<>
			<h1>This will be a list card</h1>
			<div className="card card-side bg-base-100 shadow-sm">
				<figure>
					<img src={list.poster_path} alt="" />
				</figure>
			</div>
		</>
	);
};

export default ListCard;
