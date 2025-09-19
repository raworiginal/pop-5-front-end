import { useTheme } from "../../contexts/ThemeContext.jsx";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = (props) => {
	const { switchTheme, theme } = useTheme();
	const nextTheme = theme === "dark" ? "light" : "dark";
	const nextThemeLabel =
		theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

	const handleSwitchTheme = (event) => {
		event.preventDefault();
		switchTheme();
	};

	return (
		<a
			href={`#${nextTheme}`}
			aria-label={nextThemeLabel}
			onClick={handleSwitchTheme}
			{...props}>
			{theme === "dark" ? <FaSun /> : <FaMoon />}
		</a>
	);
};

export default ThemeSwitcher;
