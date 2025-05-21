import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import "../../styles/fairytale/Scene2.scss";
const base = import.meta.env.BASE_URL;

const Scene2 = () => {
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	//scroll control
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	//rotate items based on scroll position
	const rotate = useTransform(scrollYProgress, [0, 1], ["-90deg", "90deg"]);

	//play/pause audio based on scrollYProgress
	useEffect(() => {
		const scrollAudioControl = scrollYProgress.on("change", (v) => {
			const audio = audioRef.current;
			if (!audio) return;

			if (v >= 0.25 && v <= 0.76) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});

		return scrollAudioControl;
	}, [scrollYProgress]);
	//log scrollYProgress changes
	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("Scene 2 scrollYProgress", v);
	});

	return (
		<section className="scene scene2" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />
				<img src={`${base}fallingalice.png`} className="centerpiece" alt="falling alice" />
				<motion.div className="floating-item item1" style={{ rotate }}>
					<img src={`${base}items1.png`} alt="Floating Item 1" />
				</motion.div>

				<motion.div className="floating-item item2" style={{ rotate }}>
					<img src={`${base}items2.png`} alt="Floating Item 2" />
				</motion.div>
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src={`${base}soundscene2.mp3`} type="audio/mpeg" />{" "}
			</audio>
		</section>
	);
};

export default Scene2;
