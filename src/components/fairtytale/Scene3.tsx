import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "../../styles/fairytale/Scene3.scss";
const base = import.meta.env.BASE_URL;

const Scene3 = () => {
	const sectionRef = useRef(null);
	const audioRef = useRef<HTMLAudioElement>(null);

	//scale value of alice image
	const [size, setSize] = useState(0.3);
	//track current size state: used to determine whether to grow or shrink
	const [sizeStage, setSizeStage] = useState<"shrunk" | "normal" | "grown">("normal");

	//scroll control
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	//play/pause audio based on scrollYProgress
	useEffect(() => {
		const scrollAudioControl = scrollYProgress.on("change", (v) => {
			const audio = audioRef.current;
			if (!audio) return;

			if (v >= 0.25 && v <= 0.75) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
			}
		});
		return scrollAudioControl;
	}, [scrollYProgress]);

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		console.log("Scene 3 scrollYProgress", v);
	});
	//lower size and sizeStage to 0.1 and 'shrunk' unles sizeStage is 'grown' then set everything back to normal
	const shrink = () => {
		if (sizeStage === "normal") {
			setSize(0.1);
			setSizeStage("shrunk");
		} else if (sizeStage === "grown") {
			setSize(0.3); // back to normal
			setSizeStage("normal");
		}
	};
	//increase the size and sizestage to 0.5 and 'grown' unless sizeStage is 'shrunk' then set everything back to normal
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
					<img src={`${base}alicestanding.png`} alt="Alice" className="big-image" style={{ transform: `scale(${size})` }} />

					<div className="buttons">
						<img src={`${base}bottle.png`} alt="Shrink" className="button button-shrink" onClick={shrink} />
						<img src={`${base}cake.png`} alt="Grow" className="button button-grow" onClick={grow} />
					</div>
				</div>
			</div>

			<audio ref={audioRef} loop preload="auto">
				<source src={`${base}soundscene3.mp3`} type="audio/mpeg" />
			</audio>
		</section>
	);
};

export default Scene3;
