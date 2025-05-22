import { Info } from "../components/portal/Info";
import { Carousel } from "../components/portal/Carousel";
import "../styles/portal/About.scss";

const About = () => {
	return (
		<>
			<Info />
			<Carousel />
			<div className="spacer"> </div>
		</>
	);
};
export default About;
