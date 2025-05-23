import { useEffect, useState } from "react";
import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const { fairytales, isLoading } = useFairytaleList();
	const [story, setStory] = useState<any | null>(null);
	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		const urlId = new URL(window.location.href).pathname.split("/").pop();
		setId(urlId || null);
	}, []);

	useEffect(() => {
		if (!id || fairytales.length === 0) return;

		const match = fairytales.find((s: any) => s.id === id);
		setStory(match || null);
	}, [id, fairytales]);

	if (isLoading || !id || fairytales.length === 0) return <p>Loading...</p>;
	if (!story) return <p>Story not found.</p>;

	return (
		<div className="home_container">
			<Making story={story} />
		</div>
	);
};

export default MakingOf;
