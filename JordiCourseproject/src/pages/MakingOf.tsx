import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const id = new URL(window.location.href).pathname.split("/").pop();
	const { fairytales, isLoading } = useFairytaleList();

	// Only render once data is loaded and array is populated
	if (isLoading || !id || fairytales.length === 0) return <p>Loading...</p>;

	const story = fairytales.find((s: any) => s.id === id);
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
