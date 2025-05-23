import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll } from "framer-motion";
import "../../styles/fairytale/Scene4.scss";
const base = import.meta.env.BASE_URL;

const Scene4 = () => {
	//ref to the entire section to track scroll position
	const sectionRef = useRef(null);

	//ref to the audio element to control playback based on scroll, this allows us to play/pause the audio based on scroll position
	const audioRef = useRef<HTMLAudioElement>(null);

	//determines if orbit controls are activated after click
	const [orbitActive, setOrbitActive] = useState(false);

	//determines if the image is fully visible
	const [imageVisible, setImageVisible] = useState(false);

	//determines if the 3d model is shown or hidden
	const [showModel, setShowModel] = useState(false);

	//hook to track scroll progress relative to sectionRef
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	//toggle the visibiltiy of the image
	const handleReveal = () => setImageVisible((prev) => !prev);

	//toggle the visibility of the 3d model
	const toggleModel = () => {
		setShowModel((prev) => !prev);
	};

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
		console.log("Scene 4 scrollYProgress", v);
	});

	return (
		<section className="scene scene4" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />

				<div className="content">
					{/* afbeelding die langzaam zichtbaar wordt na klik */}
					<img src={`${base}cat.png`} alt="Reveal" className="interactive-image fade-image" style={{ opacity: imageVisible ? 1 : 0.2 }} onClick={handleReveal} />
					{/* knop om het 3d model te tonen of verbergen */}
					<img src={`${base}watch.png`} alt="Show 3D" className="interactive-image model-trigger" onClick={toggleModel} />{" "}
				</div>
			</div>

			{/* toont het 3d canvas wanneer showModel actief is */}
			{showModel && (
				<div className="model-overlay" onClick={() => setOrbitActive(true)}>
					<Canvas>
						<OrbitControls enableDamping enabled={orbitActive} enableZoom={false} />
						<Environment preset="forest" />

						<Model />
					</Canvas>
				</div>
			)}

			{/* audiobestand dat via scroll wordt bediend */}
			<audio ref={audioRef} loop preload="auto">
				<source src={`${base}soundscene4.mp3`} type="audio/mpeg" />{" "}
			</audio>
		</section>
	);
};

//laadt en toont het .glb 3d model
function Model() {
	const { scene } = useGLTF(`${base}watch.glb`);
	return (
		<group position={[1.5, -0.5, 0]} rotation={[0, Math.PI, 0]}>
			<primitive object={scene} scale={5} />
		</group>
	);
}

//preload het model zodat het sneller wordt geladen wanneer nodig
useGLTF.preload(`${base}watch.glb`);

export default Scene4;
