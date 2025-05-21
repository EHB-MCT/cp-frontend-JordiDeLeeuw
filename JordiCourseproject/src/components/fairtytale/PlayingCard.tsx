import "../../styles/fairytale/PlayingCard.scss";

//define the props type for the PlayingCard component.
type Props = {
	//the suit symbol ♥, ♠, ♣, ♦  defaults to "♥"
	suit?: string;
	//the value of the card defaults to 5
	value?: string;
	//any custom content to be inserted into the center of the card
	children?: string;
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
