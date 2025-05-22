const base = import.meta.env.BASE_URL;
import "../../styles/portal/Info.scss";

export const Info = () => {
	return (
		<div className="info_div1">
			{/* Title, paragraph, and button */}
			<div className="students_div2">
				<h1>EHB STUDENTS</h1>
				<p>
					EHB-studenten Front-End Development werken dit semester met React aan een parallax website rond het thema sprookjes. <br />
					Ze combineren techniek en creativiteit om een interactieve webervaring te creëren met diepte-effecten en animaties. <br />
					Zo leren ze React-componenten, state management en visuele effecten toepassen om hun sprookjeswereld tot leven te brengen.
				</p>
				<button>
					<p>Bekijk alle sprookjes</p>
				</button>
			</div>

			{/* Collage image */}
			<img src={`${base}collage.png`} alt="collage" className="students_collage" />
		</div>
	);
};
