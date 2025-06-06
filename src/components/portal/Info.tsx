import { useNavigate } from "react-router-dom";
const base = import.meta.env.BASE_URL;
import "../../styles/portal/Info.scss";

export const Info = () => {
	//initialize navigation function
	const navigate = useNavigate();
	//render the info section with title, description, navigation button, and image
	return (
		<div className="info_div1">
			{/* title, paragraph, and button */}
			<div className="students_div2">
				<h1>EHB STUDENTS</h1>
				<p>
					EHB-studenten Front-End Development werken dit semester met React aan een parallax website rond het thema sprookjes. <br />
					Ze combineren techniek en creativiteit om een interactieve webervaring te creëren met diepte-effecten en animaties. <br />
					Zo leren ze React-componenten, state management en visuele effecten toepassen om hun sprookjeswereld tot leven te brengen.
				</p>
				<button onClick={() => navigate("/")}>
					<p>Bekijk alle sprookjes</p>
				</button>
			</div>

			{/* collage image */}
			<img src={`${base}collage.png`} alt="collage" className="students_collage" />
		</div>
	);
};
