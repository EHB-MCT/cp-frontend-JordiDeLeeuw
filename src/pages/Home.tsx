import { Carousel } from "../components/portal/Carousel";
import { Stories } from "../components/portal/Stories";

const Home = () => {
	return (
		<div className="home_container">
			<Carousel />
			<Stories />
		</div>
	);
};

export default Home;
