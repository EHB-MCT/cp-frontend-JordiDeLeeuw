import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../styles/fairytale/Scene5.scss";
const base = import.meta.env.BASE_URL;

const Scene5 = () => {
	//references
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);
	const constraintsRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	//play/pause audio based on scroll progress
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (v) => {
			const audio = audioRef.current;
			if (!audio) return;

			if (v >= 0.1 && v <= 0.75) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});
		return unsubscribe;
	}, [scrollYProgress]);

	//scroll to top when image clicked
	const handleScrollTop = () => {
		console.log;
		("Scroll to top clicked");
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	return (
		<section className="scene scene5" ref={sectionRef}>
			{/* sticky container */}
			<div className="scene-sticky">
				<div className="background-image" />
				<div className="content">
					{/* image that scrolls u to top */}
					<img src={`${base}door.png`} alt="Scroll to top" className="interactive-image doorbutton" onClick={handleScrollTop} />
					{/* image that grows as you scroll */}
					<div ref={constraintsRef} className="drag-area">
						<motion.img src={`${base}head.png`} className="draggable-image" drag dragMomentum={false} dragConstraints={constraintsRef} />
					</div>
				</div>
			</div>

			{/* audio element */}
			<audio ref={audioRef} loop preload="auto">
				<source src={`${base}soundscene5.mp3`} type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene5;
