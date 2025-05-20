import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "../../styles/fairytale/Scene1.scss";

const Scene1 = () => {
	const sectionRef = useRef(null);
	const stickyRef = useRef(null);
	const sentinelRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	const [isSticky, setIsSticky] = useState(false);

	//detect if just above sticky has scrolled out — meaning sticky is stuck
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			}
		);

		if (sentinelRef.current) {
			observer.observe(sentinelRef.current);
		}

		return () => {
			if (sentinelRef.current) observer.unobserve(sentinelRef.current);
		};
	}, []);

	// play/pause audio based on sticky state
	useEffect(() => {
		if (!audioRef.current) return;

		if (isSticky) {
			audioRef.current.play().catch((err) => {
				console.warn("Autoplay blocked or failed:", err);
			});
		} else {
			audioRef.current.pause();
		}
	}, [isSticky]);

	// scroll animation setup
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("scrollYProgress", v);
	});

	const x2 = useTransform(scrollYProgress, [0, 1], ["10vw", "83vw"]);
	const opacity2 = useTransform(scrollYProgress, [0.75, 0.83], [1, 0]);

	const x1 = useTransform(scrollYProgress, [0, 1], ["-20vw", "83vw"]);
	const opacity1 = useTransform(scrollYProgress, [0.75, 0.83], [1, 0]);

	return (
		<section className="scene scene1" ref={sectionRef}>
			{/* Sentinel to detect when sticky becomes active */}
			<div ref={sentinelRef} style={{ height: "1px" }} />

			<div className="scene-sticky" ref={stickyRef}>
				<div className="background-image" />
				<motion.img src="/alicerunning.png" className="moving-image image1" style={{ x: x1, opacity: opacity1 }} alt="Foreground 1" />
				<motion.img src="/runningbunny.png" className="moving-image image2" style={{ x: x2, opacity: opacity2 }} alt="Foreground 2" />
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src="/teLaat.mp3" type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene1;
