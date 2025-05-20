import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../../styles/fairytale/Scene1.scss";

const Scene1 = () => {
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const x1 = useTransform(scrollYProgress, [0, 1], ["-20vw", "83vw"]);
	const x2 = useTransform(scrollYProgress, [0, 1], ["10vw", "83vw"]);
	const opacity = useTransform(scrollYProgress, [0.75, 0.83], [1, 0]);

	useEffect(() => {
		const unsubscribe = scrollYProgress.on("change", (v) => {
			const audio = audioRef.current;
			if (!audio) return;

			if (v >= 0.25 && v <= 0.76) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});

		return unsubscribe;
	}, [scrollYProgress]);

	return (
		<section className="scene scene1" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />
				<motion.img src="/alicerunning.png" className="moving-image image1" style={{ x: x1, opacity }} />
				<motion.img src="/runningbunny.png" className="moving-image image2" style={{ x: x2, opacity }} />
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src="/teLaat.mp3" type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene1;
