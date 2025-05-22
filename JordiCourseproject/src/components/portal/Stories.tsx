import { useFairytaleList } from "../../hooks/useFairytaleList";
import { useSearchParams } from "react-router-dom";
import { Item } from "../portal/Item";
import "../../styles/portal/Stories.scss";

export const Stories = () => {
	const { fairytales, isLoading } = useFairytaleList();
	const [searchParams] = useSearchParams();
	const activeTheme = searchParams.get("theme");
	const searchTerm = searchParams.get("search")?.toLowerCase() || "";

	const filteredFairytales = fairytales.filter((f) => {
		const matchesTheme = activeTheme ? f.theme === activeTheme : true;
		const matchesSearch = searchTerm === "" || f.fairytale.toLowerCase().includes(searchTerm) || f.nameStudent.toLowerCase().includes(searchTerm);
		return matchesTheme && matchesSearch;
	});

	if (isLoading) return <p>Loading...</p>;

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
