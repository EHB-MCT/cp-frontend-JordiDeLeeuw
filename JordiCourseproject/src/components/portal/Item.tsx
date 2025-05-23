import { useNavigate } from "react-router-dom";
import "../../styles/portal/Item.scss";
const base = import.meta.env.BASE_URL;
type ItemProps = {
	image: string;
	name: string;
	theme: string;
	fairytale: string;
	id: string;
	variant: "list" | "carousel";
};
//
export const Item = ({ image, name, theme, fairytale, variant, id }: ItemProps) => {
	//initialize navigation function
	const navigate = useNavigate();
	//render the item layout with image, text info, and navigation button
	return (
		//if the variant is list, add the class "list" to the item_div1 div otherwise use the default class
		<div className={`item_div1 ${variant === "list" ? "list" : ""}`}>
			<img src={image} alt={name} />
			<div className="item_div2">
				<h1>{name}</h1>
				<h2>{fairytale}</h2>
				<div className="header_div3">
					<h3>{theme}</h3>
					<button onClick={() => navigate(`makingof/${id}`)}>
						<img src={`${base}smallarrow.png`} alt="arrow" />
					</button>
				</div>
			</div>
		</div>
	);
};
//export the props type so it can be reused in other components
export type { ItemProps };
