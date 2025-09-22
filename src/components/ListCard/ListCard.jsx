import { Link } from "react-router";

const ListCard = ({ topic, list }) => {
	return (
		<>
			<article className="card card-border w-sm mx-auto">
				<header className="flex">
					<h2 className="card-title">{`${list.author.username}'s Top 5 ${topic.title}`}</h2>
					<section className="card-actions justify-end">
						<Link to={`lists/${list.id}`} className="btn btn-info">
							Edit
						</Link>
						<button className="btn btn-warning">Delete</button>
					</section>
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
