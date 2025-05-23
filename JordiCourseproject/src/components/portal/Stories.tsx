import { useFairytaleList } from "../../hooks/useFairytaleList";
import { useSearchParams } from "react-router-dom";
import { Item } from "../portal/Item";
import "../../styles/portal/Stories.scss";

export const Stories = () => {
	//get fairytales from the custom hook useFairytaleList
	const { fairytales, isLoading } = useFairytaleList();
	//get the search params from the URL
	const [searchParams] = useSearchParams();
	const activeTheme = searchParams.get("theme");
	const searchTerm = searchParams.get("search")?.toLowerCase() || "";
	//filter the fairytales based on the active theme and search term
	const filteredFairytales = fairytales.filter((f) => {
		const matchesTheme = activeTheme ? f.theme === activeTheme : true;
		const matchesSearch = searchTerm === "" || f.fairytale.toLowerCase().includes(searchTerm) || f.nameStudent.toLowerCase().includes(searchTerm);
		return matchesTheme && matchesSearch;
	});
	//show loading message if fairytales are still loading
	if (isLoading) return <p>Loading...</p>;
	//render the filtered fairytales in a grid layout
	return (
		<div className="list_div1">
			<h1>STORYS</h1>
			<div className="list_grid">
				{filteredFairytales.map((fairy, i) => (
					<Item image={fairy.imgThumbnail} name={fairy.nameStudent} theme={fairy.genre} fairytale={fairy.fairytale} id={fairy.id} variant="list" />
				))}
			</div>
		</div>
	);
};
