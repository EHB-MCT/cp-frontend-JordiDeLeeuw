import { useRef, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import "../../styles/fairytale/Scene1.scss";
//the base URL for assets
const base = import.meta.env.BASE_URL;

const Scene1 = () => {
	//ref to the entire section to track scroll position
	const sectionRef = useRef(null);
	//ref to the audio element to control playback based on scroll, this allows us to play/pause the audio based on scroll position
	const audioRef = useRef<HTMLAudioElement>(null);

	//hook to track scroll progress relative to sectionRef
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		//start when section enters so when the of the section is at the bottom of the viewport
		//end when the section is at the top of the viewport
		offset: ["start end", "end start"],
	});

	//move image1 from left to right as the user scrolls
	const x1 = useTransform(scrollYProgress, [0, 1], ["-20vw", "78vw"]);
	//move image2 from a different start position to the same end point
	const x2 = useTransform(scrollYProgress, [0, 1], ["10vw", "83vw"]);
	//fade out both images between 75% and 83% scroll progress
	const opacity = useTransform(scrollYProgress, [0.75, 0.83], [1, 0]);

	//play/pause audio based on scroll progress
	useEffect(() => {
		//listen for scroll progress changes
		const scrollAudioControl = scrollYProgress.on("change", (v) => {
			//get the audio element
			const audio = audioRef.current;
			//if the audio element is not available, return
			if (!audio) return;
			//play audio while scroll is between 25% and 76%
			if (v >= 0.25 && v <= 0.76) {
				//play the audio and catch any errors
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});
		//cleanup the listener on unmount
		return scrollAudioControl;
		//rerun the effect when scrollYProgress changes
	}, [scrollYProgress]);

	//log scrollYProgress changes
	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("Scene 1 scrollYProgress", v);
	});

	return (
		<section className="scene scene1" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />
				<motion.img src={`${base}alicerunning.png`} className="moving-image image1" style={{ x: x1, opacity }} />
				<motion.img src={`${base}runningbunny.png`} className="moving-image image2" style={{ x: x2, opacity }} />
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src={`${import.meta.env.BASE_URL}soundscene1.mp3`} type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene1;
