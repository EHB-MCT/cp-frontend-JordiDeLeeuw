import useEmblaCarousel from "embla-carousel-react";
import { useCallback, type Key } from "react";
import { Item } from "../portal/Item";
import "../../styles/portal/Carousel.scss";
import { usePopularFairytales } from "../../hooks/usePopularFairytales";
const base = import.meta.env.BASE_URL;

export const Carousel = () => {
	//fetch the fairytales and loading state from the usePopularFairytales hook
	const { fairytales, isLoading } = usePopularFairytales();
	//initialize the embla carousel with options
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		slidesToScroll: 2,
		containScroll: "trimSnaps",
	});
	//fucntion to scroll to the previous slide
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
		//emblaApi is the depencency array, so the function will be called when the emblaApi changes
	}, [emblaApi]);
	//function to scroll to the next slide
	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);
	//if the fairytales are still loading, show a loading message
	if (isLoading) return <p>Loading...</p>;
	//render the carousel component with navigatoin buttons and fairytale items
	return (
		<div className="carousel_div1">
			<h1>HOT TODAY</h1>

			<div className="carousel_div2">
				{/* left scroll button */}
				<button onClick={scrollPrev} className="carousel-arrow">
					<img src={`${base}circlearrow.png`} alt="left arrow" style={{ transform: "scaleX(-1)" }} />
				</button>

				<div className="carousel_div3 embla" ref={emblaRef}>
					<div className="embla__container">
						{/* map through the fairytales and create an Item component for each one */}
						{/* the key is set to the index of the fairytale in the array */}
						{/* the image, name, theme, fairytale, and id are passed as props to the Item component */}
						{fairytales.map((fairy: { imgThumbnail: string; nameStudent: string; genre: string; fairytale: string; id: string }) => (
							<div className="embla__slide" key={fairy.id as Key}>
								<Item image={fairy.imgThumbnail} name={fairy.nameStudent} theme={fairy.genre} fairytale={fairy.fairytale} id={fairy.id} variant={"carousel"} />
							</div>
						))}
					</div>
				</div>
				{/* right scroll button */}
				<button onClick={scrollNext} className="carousel-arrow">
					<img src={`${base}circlearrow.png`} alt="right arrow" />
				</button>
			</div>
		</div>
	);
};
