import { useState, useEffect } from "react";

export const useFairytaleList = () => {
	const [fairytales, setFairytales] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const themeMap = {
		avontuur: "AVONTUUR",
		mythologie: "AVONTUUR",
		magie: "FANTASIE",
		fantasie: "FANTASIE",
		romantiek: "ROMANTIEK",
		dierenverhaal: "ROMANTIEK",
		horror: "HORROR",
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("https://raw.githubusercontent.com/EHB-MCT/cp-frontend-MaximWesterbeek/refs/heads/main/course-project/public/api/fairytaleList.json");
				if (!response.ok) throw new Error("Failed to fetch data");

				const json = await response.json();

				const updated = json.map((fairy) => ({
					...fairy,
					viewed: false,
					theme: themeMap[fairy.genre.toLowerCase()] || "ONBEKEND",
				}));

				setFairytales(updated);
			} catch (err) {
				console.error("Error fetching fairytales:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { fairytales, isLoading };
};
