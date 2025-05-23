import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const { id } = useParams<{ id: string }>();
	const { fairytales, isLoading } = useFairytaleList();
	const [story, setStory] = useState<any | null>(null);

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
