import { Link } from "react-router";
const Landing = () => {
	return (
		<main>
			<div className="hero glass bg-secondary">
				<div className="hero-content text-center">
					<div className="max-w-md p-2 bg-primary glass rounded-box">
						<h1 className="text-9xl font-bold text-primary-content rampart">
							POP 5!
						</h1>
						<p className="py-6 text-5xl font-bold text-primary-content">
							Share Your Top 5s!
						</p>
						<Link className="btn" to={"/sign-in"}>
							Login
						</Link>
						<Link className="btn btn-info" to={"/sign-up"}>
							Signup
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Landing;
