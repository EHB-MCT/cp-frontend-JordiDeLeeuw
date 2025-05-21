import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "../../styles/fairytale/Scene3.scss";

const Scene3 = () => {
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	//size state: 'shrunk', 'normal', 'grown'
	const [size, setSize] = useState(0.3);
	const [sizeStage, setSizeStage] = useState<"shrunk" | "normal" | "grown">("normal");

	//scroll-based audio
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

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

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("Scene 3 scrollYProgress", v);
	});

	const shrink = () => {
		if (sizeStage === "normal") {
			setSize(0.1);
			setSizeStage("shrunk");
		} else if (sizeStage === "grown") {
			setSize(0.3); // back to normal
			setSizeStage("normal");
		}
	};

	const grow = () => {
		if (sizeStage === "shrunk") {
			setSize(0.3); // back to normal
			setSizeStage("normal");
		} else if (sizeStage === "normal") {
			setSize(0.5); // grow once
			setSizeStage("grown");
		}
	};

	return (
		<section className="scene scene3" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />
				<div className="content">
					<img src="/alicestanding.png" alt="Alice" className="big-image" style={{ transform: `scale(${size})` }} />

					<div className="buttons">
						<img src="/bottle.png" alt="Shrink" className="button button-shrink" onClick={shrink} />
						<img src="/cake.png" alt="Grow" className="button button-grow" onClick={grow} />
					</div>
				</div>
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src="/soundscene3.mp3" type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene3;
