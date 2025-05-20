import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import "../../styles/fairytale/Scene2.scss";

const Scene2 = () => {
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	//scroll control
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	//floating animations
	const floatX = useTransform(scrollYProgress, [0, 1], ["-10px", "10px"]);
	const floatY = useTransform(scrollYProgress, [0, 1], ["10px", "-10px"]);
	const rotate = useTransform(scrollYProgress, [0, 1], ["-100deg", "100deg"]);

	//play/pause audio based on scrollYProgress
	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (v) => {
			const audio = audioRef.current;
			if (!audio) return;

			if (v >= 0.05 && v <= 0.76) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});

		return unsubscribe;
	}, [scrollYProgress]);

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("Scene 2 scrollYProgress", v);
	});

	return (
		<section className="scene scene2" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />
				<img src="/fallingalice.png" className="centerpiece" alt="falling alice" />

				<motion.div className="floating-item item1" style={{ x: floatX, y: floatY, rotate }}>
					<img src="/items1.png" alt="Floating Item 1" />
				</motion.div>

				<motion.div className="floating-item item2" style={{ x: floatY, y: floatX, rotate }}>
					<img src="/items2.png" alt="Floating Item 2" />
				</motion.div>
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src="/soundscene2.mp3" type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene2;
