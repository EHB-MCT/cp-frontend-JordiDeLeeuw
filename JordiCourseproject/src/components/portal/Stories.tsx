import { useFairytaleList } from "../../hooks/useFairytaleList";
import { useSearchParams } from "react-router-dom";
import { Item } from "../portal/Item";
import "../../styles/portal/Stories.scss";

type Fairytale = {
	imgThumbnail: string;
	nameStudent: string;
	genre: string;
	fairytale: string;
	id: string;
	theme: string;
};

export const Stories = () => {
	//get fairytales from the custom hook useFairytaleList
	const { fairytales, isLoading } = useFairytaleList();
	//get the search params from the URL
	const [searchParams] = useSearchParams();
	//get the "theme" query parameter from the URL, example: ?theme=AVONTUUR)
	const activeTheme = searchParams.get("theme");
	//get the "search" query parameter, convert it to lowercase, or default to empty string
	const searchTerm = searchParams.get("search")?.toLowerCase() || "";
	//filter the fairytales based on the active theme and search term
	const filteredFairytales = (fairytales as Fairytale[]).filter((f) => {
		//check if the current fairytale matches the active theme. if no theme is selected  match all themes returns true
		const matchesTheme = activeTheme ? f.theme === activeTheme : true;
		//check if the search term is empty, or matches either the fairytale title or student name. comparison is case-insensitive due to `.toLowerCase()`
		let matchesSearch = false;
		if (searchTerm === "") {
			matchesSearch = true; // allow everything
		} else if (f.fairytale.toLowerCase().includes(searchTerm)) {
			matchesSearch = true;
		} else if (f.nameStudent.toLowerCase().includes(searchTerm)) {
			matchesSearch = true;
		}
		// only keep items that satisfy both criteria
		return matchesTheme && matchesSearch;
	});
	//show loading message if fairytales are still loading
	if (isLoading) return <p>Loading...</p>;
	//render the filtered fairytales in a grid layout
	return (
		<div className="list_div1">
			<h1>STORYS</h1>
			<div className="list_grid">
				{filteredFairytales.map((fairy: Fairytale) => (
					<Item image={fairy.imgThumbnail} name={fairy.nameStudent} theme={fairy.genre} fairytale={fairy.fairytale} id={fairy.id} variant={"list"} />
				))}
			</div>
		</div>
	);
};
