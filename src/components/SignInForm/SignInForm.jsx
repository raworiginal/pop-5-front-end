// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const SignInForm = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (evt) => {
		setMessage("");
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const signedInUser = await signIn(formData);

			setUser(signedInUser);
			navigate("/topics");
		} catch (err) {
			setMessage(err.message);
		}
	};

	return (
		<fieldset className="fieldset bg-base-200 rounded-box w-xs mx-auto border p-4">
			<legend className="fieldset-legend text-lg">Sign In</legend>
			<form autoComplete="off" onSubmit={handleSubmit}>
				<p>{message}</p>
				<label className="label text-lg" htmlFor="username">
					Username:
				</label>
				<input
					className="input"
					type="text"
					autoComplete="off"
					id="username"
					value={formData.username}
					name="username"
					onChange={handleChange}
					placeholder="username"
					required
				/>

				<label className="label text-lg" htmlFor="password">
					Password:
				</label>
				<input
					className="input"
					type="password"
					autoComplete="off"
					id="password"
					value={formData.password}
					name="password"
					placeholder="password"
					onChange={handleChange}
					required
				/>

				<div>
					<button className="btn btn-ghost btn-secondary mt-4">Sign In</button>
					<button
						className="btn btn-ghost btn-warning mt-4"
						onClick={() => navigate("/")}>
						Cancel
					</button>
				</div>
			</form>
		</fieldset>
	);
};

export default SignInForm;
