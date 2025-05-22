import { useFairytaleList } from "./useFairytaleList";

export const usePopularFairytales = () => {
	const { fairytales, isLoading } = useFairytaleList();

	if (isLoading) return { fairytales: [], isLoading };

	const today = new Date().toDateString();
	const key = `popularFairytales-${today}`;

	let sorted = [];

	const cached = localStorage.getItem(key);
	if (cached) {
		const ids = JSON.parse(cached);
		sorted = ids.map((id: string) => fairytales.find((f) => f.id === id)).filter(Boolean);
	} else {
		sorted = [...fairytales].sort(() => 0.5 - Math.random()); // shuffle
		const ids = sorted.map((f) => f.id);
		localStorage.setItem(key, JSON.stringify(ids));
	}

	return { fairytales: sorted, isLoading: false };
};
