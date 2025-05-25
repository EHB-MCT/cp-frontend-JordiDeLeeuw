import { useState } from "react";
const base = import.meta.env.BASE_URL;
import { useNavigate } from "react-router-dom";
import "../../styles/portal/MakingOf.scss";

type Story = {
	id: string;
	imgBanner: string;
	imgThumbnail: string;
	fairytale: string;
	nameStudent: string;
	genre: string;
	description: string;
	extraInfo?: string;
	fairytaleLink: string;
	imgsExtra?: string[];
};

//define and export the Making component that takes a story prop of type Story
export const Making = ({ story }: { story: Story }) => {
	//initialize state for expanded view and navigation function
	const [expanded, setExpanded] = useState(false);
	const navigate = useNavigate();
	//render the making of layout with toggle sections, navigation logic and extra visuals
	return (
		<div className="making_div1">
			{/* title */}
			<h1>MAKING OF</h1>
			{/* banner + story Info */}
			<div className="making_div2">
				<img src={story.imgBanner} alt="bannerfoto" />
				<div className="making_div2_smaller">
					<h2>{story.fairytale}</h2>
					<h4>{story.nameStudent}</h4>
				</div>
			</div>
			{/* story details + thumbnail */}
			<div className="making_div_toggle">
				<div className="making_div3" style={{ display: expanded ? "none" : "flex" }}>
					<div className="making_div3_left">
						<h5>Verhaal</h5>
						<p>{story.description}</p>
						<h5>Auteur</h5>
						<p>
							{story.nameStudent} <br /> {story.genre}
						</p>
						{/* button to expand the view aka show div4 */}
						<button className="making_btn" onClick={() => setExpanded(true)}>
							Lees meer
						</button>
					</div>
					<div className="making_div3_right">
						<img src={story.imgThumbnail} className="thumbnail" alt="thumbnail square" />
						{/* if the id is "jordi-de-leeuw-alice-in-wonderland" navigate to the fairytale page, otherwise open the link in a new tab */}
						<button
							className="view-story"
							onClick={() => {
								if (story.id === "jordi-de-leeuw-alice-in-wonderland") {
									window.open(story.fairytaleLink);
								} else {
									window.open(story.fairytaleLink, "_blank");
								}
							}}
						>
							<img src={`${base}eye.png`} alt="eyecon" style={{ width: "1.6vw", height: "0.8vw" }} />
							View Story
						</button>
					</div>
				</div>
				{/* expanded view aka div4 */}
				{/* this div is hidden when the expanded state is false */}
				{/* it shows the story description, extra info, and author details */}
				{/* the button to collapse the view is also here */}
				<div className="making_div4" style={{ display: expanded ? "block" : "none" }}>
					<h5>Verhaal</h5>
					<p>{story.description}</p>
					<h5>Parallax effect</h5>
					<p>{story.extraInfo || "Hier komt extra uitleg over het parallax effect."}</p>
					<h5>Auteur</h5>
					<p>
						{story.nameStudent} <br /> {story.genre}
					</p>
					<button className="making_btn" onClick={() => setExpanded(false)}>
						Lees minder
					</button>
				</div>
			</div>
			{/* extra information */}
			<div className="making_div5">
				<h1>EXTRA INFORMATIE</h1>
				<div className="making_div5_images">
					{/* if the story has extra images, show the first 3 */}
					{story.imgsExtra?.slice(0, 3).map((img, i) => (
						<img key={i} src={img} alt={`extra img ${i + 1}`} />
					))}
				</div>
				<p>{story.description}</p>
			</div>
		</div>
	);
};
