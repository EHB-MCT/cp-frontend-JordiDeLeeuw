import { Item } from "../portal/Item";

export const Carousel = () => {
	return (
		<div className="carousel_div1">
			//title
			<h1>HOT TODAY</h1>
			//arrows and div with items
			<div className="carousel_div2">
				<button>
					<img src="" alt="left arrow" />
				</button>
				<div className="carousel_div3">
					//whatever you need for a carousel but right now
					<Item />
					<Item />
				</div>
				<button>
					<img src="" alt="right arrow" />
				</button>
			</div>
		</div>
	);
};
