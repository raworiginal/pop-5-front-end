import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
const NavBar = () => {
	const { user, setUser } = useContext(UserContext);

	const handleSignOut = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<nav className="navbar mx-auto w-5xl bg-base-100 shadow-sm">
			{/* LEFT / START */}
			<div className="navbar-start">
				{/* Mobile dropdown */}
				<div className="dropdown">
					<button
						tabIndex={0}
						className="btn btn-ghost lg:hidden"
						aria-label="Open menu">
						{/* hamburger icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					{/* Mobile menu */}
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
						{user ? (
							<>
								<li className="menu-title">
									<span>Welcome, {user.username}</span>
								</li>
								<li>
									<Link to="/">Dashboard</Link>
								</li>
								<li>
									<button onClick={handleSignOut}>Sign Out</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/sign-in">Sign In</Link>
								</li>
								<li>
									<Link to="/sign-up">Sign Up</Link>
								</li>
							</>
						)}
					</ul>
				</div>

				{/* Brand */}
				<Link
					to="/"
					className="btn btn-info shadow tracking-tighter  text-3xl rampart">
					POP 5!
				</Link>
			</div>

			{/* CENTER (desktop menu) */}
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{user ? (
						<>
							<li className="disabled">
								<span>Welcome, {user.username}</span>
							</li>
							<li>
								<Link to="/">Dashboard</Link>
							</li>
							<li>
								<button onClick={handleSignOut}>Sign Out</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/sign-in">Sign In</Link>
							</li>
							<li>
								<Link to="/sign-up">Sign Up</Link>
							</li>
						</>
					)}
				</ul>
			</div>

			{/* RIGHT / END */}
			<div className="navbar-end gap-2">
				<ThemeSwitcher aria-label="Toggle theme" />
			</div>
		</nav>
	);
};

export default NavBar;
