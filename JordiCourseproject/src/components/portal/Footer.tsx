import { useNavigate } from "react-router-dom";
import "../../styles/portal/Footer.scss";
const base = import.meta.env.BASE_URL;

export const Footer = () => {
	//initialize navigation function
	const navigate = useNavigate();
	//function to navigate to the about page when the button is clicked
	const handleNavigation = () => {
		navigate("/about");
	};
	//render the footer component with logo, text, and button
	return (
		<div className="footer_div1">
			{/* logo */}
			<img src={`${base}Logo.png`} alt="logo" />
			{/*text and button */}
			<div className="footer_div2">
				<p>
					23 studenten van opleiding MCT die kozen voor Front-End Design. Met een <br /> dosis creativiteit, code en flinke scheut verbeelding verzamelden <br /> ze hier al hun sprookjes. Benieuwd wie wij zijn?
				</p>
				<button onClick={handleNavigation}>
					<p>About us</p>
				</button>
			</div>
		</div>
	);
};
