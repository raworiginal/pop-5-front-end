const ListCard = ({ topic, list }) => {
	return (
		<>
			<div className="card  w- mx-auto">
				<ul className="list bg-base-100 rounded-box shadow-md">
					<li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
						{`${list.author.username}'s Top 5 ${topic.title}`}
					</li>
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
			</div>
		</>
	);
};

export default ListCard;
