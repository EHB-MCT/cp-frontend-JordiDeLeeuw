import { useParams } from "react-router-dom";
import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	const { id } = useParams();
	const { fairytales, isLoading } = useFairytaleList();
	if (isLoading) return <p>Loading...</p>;
	const story = fairytales.find((s) => s.id === id);
	if (!story) return <p>Story not found.</p>;
	return (
		<div className="home_container">
			<Making story={story} />
		</div>
	);
};
export default MakingOf;
