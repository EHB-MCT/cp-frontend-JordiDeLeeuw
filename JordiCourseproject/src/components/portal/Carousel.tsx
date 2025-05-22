import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Item } from "../portal/Item";
import "../../styles/portal/Carousel.scss";
import { useFairytaleList } from "../../hooks/useFairytaleList";
const base = import.meta.env.BASE_URL;

export const Carousel = () => {
	const { fairytales, isLoading } = useFairytaleList();
	console.log(fairytales);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: "start",
		slidesToScroll: 2,
		containScroll: "trimSnaps",
	});

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="carousel_div1">
			<h1>HOT TODAY</h1>

			<div className="carousel_div2">
				<button onClick={scrollPrev} className="carousel-arrow">
					<img src={`${base}circlearrow.png`} alt="left arrow" style={{ transform: "scaleX(-1)" }} />
				</button>

				<div className="carousel_div3 embla" ref={emblaRef}>
					<div className="embla__container">
						{fairytales.map((fairy, i) => (
							<div className="embla__slide" key={i}>
								<Item image={fairy.imgThumbnail} name={fairy.nameStudent} theme={fairy.genre} fairytale={fairy.fairytale} id={fairy.id} />
							</div>
						))}
					</div>
				</div>

				<button onClick={scrollNext} className="carousel-arrow">
					<img src={`${base}circlearrow.png`} alt="right arrow" />
				</button>
			</div>
		</div>
	);
};
