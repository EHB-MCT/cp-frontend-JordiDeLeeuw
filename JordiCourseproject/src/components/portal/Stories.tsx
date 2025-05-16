import { Item } from "../portal/Item";

export const Stories = () => {
	return (
		<div className="stories_div1">
			//title
			<h1>STORIES</h1>
			//all the items
			<div className="stories_div2">
				//probably need a for each
				<Item />
			</div>
		</div>
	);
};
