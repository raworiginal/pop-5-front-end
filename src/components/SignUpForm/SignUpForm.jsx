// SignUpForm.jsx

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const SignUpForm = () => {
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		passwordConf: "",
	});

	const { username, password, passwordConf } = formData;

	const handleChange = (evt) => {
		setMessage("");
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const newUser = await signUp(formData);
			setUser(newUser);
			navigate("/topics");
		} catch (err) {
			setMessage(err.message);
		}
	};

	const isFormInvalid = () => {
		return !(username && password && password === passwordConf);
	};

	return (
		<fieldset className="fieldset bg-base-200 rounded-box w-xs mx-auto border p-4">
			<legend className="fieldset-legend text-lg">Sign Up</legend>
			<p>{message}</p>
			<form onSubmit={handleSubmit}>
				<label className="label text-lg" htmlFor="username">
					Username:
				</label>
				<input
					className="input"
					type="text"
					id="name"
					value={username}
					name="username"
					onChange={handleChange}
					required
				/>
				<label className="label text-lg" htmlFor="password">
					Password:
				</label>
				<input
					className="input"
					type="password"
					id="password"
					value={password}
					name="password"
					onChange={handleChange}
					required
				/>
				<label className="label text-lg" htmlFor="confirm">
					Confirm Password:
				</label>
				<input
					className="input"
					type="password"
					id="confirm"
					value={passwordConf}
					name="passwordConf"
					onChange={handleChange}
					required
				/>
				<button
					className="btn btn-ghost btn-secondary mt-4"
					disabled={isFormInvalid()}>
					Sign Up
				</button>
				<button
					className="btn btn-ghost btn-warning mt-4"
					onClick={() => navigate("/")}>
					Cancel
				</button>
			</form>
		</fieldset>
	);
};

export default SignUpForm;
