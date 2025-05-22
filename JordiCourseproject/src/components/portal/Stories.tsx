import { useFairytaleList } from "../../hooks/useFairytaleList";
import { Item } from "../portal/Item";
import "../../styles/portal/Stories.scss";

export const Stories = () => {
	const { fairytales, isLoading } = useFairytaleList();

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="list_div1">
			<h1>STORYS</h1>
			<div className="list_grid">
				{fairytales.map((fairy, i) => (
					<Item image={fairy.imgThumbnail} name={fairy.nameStudent} theme={fairy.genre} fairytale={fairy.fairytale} id={fairy.id} variant="list" />
				))}
			</div>
		</div>
	);
};
