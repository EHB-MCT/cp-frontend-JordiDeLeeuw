import { useParams } from "react-router-dom";
import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const { id } = useParams<{ id: string }>();
	console.log("🧭 URL id param:", id);
	// if id is undefined, show an error
	if (!id) return <p>Missing story ID in URL.</p>;
	const { fairytales, isLoading } = useFairytaleList();
	if (isLoading) return <p>Loading...</p>;
	console.log(
		"🎯 Available IDs:",
		fairytales.map((f) => (f as { id: string }).id)
	);
	const story = fairytales.find((s) => (s as { id: string }).id === id);
	if (!story) {
		console.warn("⚠️ No matching story for:", id);
		return <p>Story not found.</p>;
	}
	return (
		<div className="home_container">
			<Making story={story} />
		</div>
	);
};
export default MakingOf;
