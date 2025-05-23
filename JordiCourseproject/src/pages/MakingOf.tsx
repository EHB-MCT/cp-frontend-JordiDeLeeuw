import { useParams } from "react-router-dom";
import { useFairytaleList } from "../hooks/useFairytaleList";
import { Making } from "../components/portal/Making";

const MakingOf = () => {
	//get story id from url
	const { id } = useParams();
	console.log(id);
	//get fairytales from the custom hook useFairytaleList
	const { fairytales, isLoading } = useFairytaleList();
	if (isLoading) return <p>Loading...</p>;
	//find the story with the given id
	//treat s as an object with an id string so TypeScript stops complaining
	const story = fairytales.find((s) => (s as { id: string }).id === id);
	if (!story) return <p>Story not found.</p>;
	return (
		<div className="home_container">
			<Making story={story} />
		</div>
	);
};
export default MakingOf;
