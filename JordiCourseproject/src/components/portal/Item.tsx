import { useNavigate } from "react-router-dom";
import "../../styles/portal/Item.scss";
const base = import.meta.env.BASE_URL;
type ItemProps = {
	image: string;
	name: string;
	theme: string;
	fairytale: string;
};

export const Item = ({ image, name, theme, fairytale }: ItemProps) => {
	const navigate = useNavigate();

	return (
		<div className="item_div1">
			{/* promo image */}
			<img src={image} alt={name} />
			{/* a lot of text */}
			<div className="item_div2">
				<h1>{name}</h1>
				<h2>{fairytale}</h2>
				<div className="header_div3">
					<h3>{theme}</h3>
					<button onClick={() => navigate("/fairytale")}>
						<img src={`${base}smallarrow.png`} alt="arrow" />
					</button>
				</div>
			</div>
		</div>
	);
};
