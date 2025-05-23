import { useState, useEffect } from "react";
//this hook fetches a list of fairytales from a JSON file and returns the data along with a loading state
export const useFairytaleList = () => {
	//state to hold the fairytales data
	const [fairytales, setFairytales] = useState([]);
	//state to hold the loading state
	const [isLoading, setIsLoading] = useState(true);
	//map raw genres to borader themes
	const themeMap = {
		avontuur: "AVONTUUR",
		mythologie: "AVONTUUR",
		magie: "FANTASIE",
		fantasie: "FANTASIE",
		romantiek: "ROMANTIEK",
		dierenverhaal: "ROMANTIEK",
		horror: "HORROR",
	};
	//fetch the fairytales data from the JSON file
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				//fetch the fairtales data from the JSON file
				const response = await fetch("https://raw.githubusercontent.com/EHB-MCT/cp-frontend-MaximWesterbeek/refs/heads/main/course-project/public/api/fairytaleList.json");
				if (!response.ok) throw new Error("Failed to fetch data");
				//parse the response as JSON
				const json = await response.json();
				//to each fairytale, add a theme property based on the genre
				const updated = json.map((fairy) => ({
					...fairy,
					theme: themeMap[fairy.genre.toLowerCase()] || "ONBEKEND",
				}));
				//set the fairytales state with the updated data
				setFairytales(updated);
			} catch (err) {
				console.error("Error fetching fairytales:", err);
			} finally {
				setIsLoading(false);
			}
		};
		//call the fetchData function to fetch the data
		fetchData();
	}, []);
	//return the fairytales data and loading state
	return { fairytales, isLoading };
};
