import { useNavigate } from "react-router-dom";
import "../../styles/Footer.scss";

export const Footer = () => {
	const navigate = useNavigate();

	const handleNavigation = () => {
		navigate("/about");
	};
	return (
		<div className="footer_div1">
			{/* logo */}
			<img src="/Logo.png" alt="logo" />
			{/*text and button */}
			<div className="footer_div2">
				<p>
					23 studenten van opleidng MCT die kozen voor Front-End Design. Met een <br /> dosis creativiteit, code en flinke scheut verbeelding verzamelden <br /> ze hier al hun sprookjes. Benieuwd wie wij zijn?
				</p>
				<button onClick={handleNavigation}>
					<p>About us</p>
				</button>
			</div>
		</div>
	);
};
