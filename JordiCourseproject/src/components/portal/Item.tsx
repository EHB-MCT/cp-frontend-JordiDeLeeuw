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

export const Item = ({ image, name, theme, fairytale, variant, id }: ItemProps) => {
	const navigate = useNavigate();

	return (
		<div className={`item_div1 ${variant === "list" ? "carousel" : ""}`}>
			<img src={image} alt={name} />
			<div className="item_div2">
				<h1>{name}</h1>
				<h2>{fairytale}</h2>
				<div className="header_div3">
					<h3>{theme}</h3>
					<button onClick={() => navigate(`/makingof/${id}`)}>
						<img src={`${base}smallarrow.png`} alt="arrow" />
					</button>
				</div>
			</div>
		</div>
	);
};
