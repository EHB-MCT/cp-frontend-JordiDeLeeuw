import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const id = new URL(window.location.href).pathname.split("/").pop();
	console.log("🧭 URL id param:", id);
	// if id is undefined, show an error
	if (!id) return <p>Missing story ID in URL.</p>;
	const { fairytales, isLoading } = useFairytaleList();
	// wait until we have both fairytales and a valid id
	if (isLoading || !id) return <p>Loading...</p>;

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
