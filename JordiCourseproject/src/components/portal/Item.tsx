import { useNavigate } from "react-router-dom";
import "../../styles/portal/Item.scss";

export const Item = () => {
	const navigate = useNavigate();

	return (
		<div className="item_div1">
			{/* promo image */}
			<img src="/promo.png" alt="promo" />
			{/* a lot of text */}
			<div className="item_div2">
				<h1>name</h1>
				<h2>name fairytale</h2>
				<div className="header_div3">
					<h3>theme</h3>
					<button onClick={() => navigate("/fairytale")}>
						<img src="smallarrow.png" alt="arrow" />
					</button>
				</div>
			</div>
		</div>
	);
};
