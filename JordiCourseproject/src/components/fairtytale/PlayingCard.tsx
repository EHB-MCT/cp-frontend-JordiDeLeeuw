import React from "react";
import "../../styles/fairytale/PlayingCard.scss";

type Props = {
	suit?: string;
	value?: string;
	children?: React.ReactNode;
};

const PlayingCard = ({ suit = "♥", value = "5", children }: Props) => {
	return (
		<div className="playing-card">
			<div className="card-corner top">
				{suit}
				{value}
			</div>
			<div className="card-content">{children}</div>
			<div className="card-corner bottom">
				{suit}
				{value}
			</div>
		</div>
	);
};

export default PlayingCard;
