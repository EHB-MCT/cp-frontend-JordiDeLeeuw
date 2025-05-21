import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { useScroll } from "framer-motion";
import "../../styles/fairytale/Scene4.scss";

const Scene4 = () => {
	//referentie naar het section element (voor scroll tracking)
	const sectionRef = useRef(null);
	<Environment preset="sunset" />;

	//referentie naar het audio-element
	const audioRef = useRef<HTMLAudioElement>(null);

	//bepaalt of orbit controls geactiveerd zijn na klik
	const [orbitActive, setOrbitActive] = useState(false);

	//bepaalt of de afbeelding volledig zichtbaar is
	const [imageVisible, setImageVisible] = useState(false);

	//bepaalt of het 3d model getoond wordt
	const [showModel, setShowModel] = useState(false);

	//framer-motion hook om scrollvoortgang te meten binnen dit section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	//speelt het audiobestand af zolang scrollYProgress zich binnen een bereik bevindt
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
		//verwijdert de scroll listener wanneer component unmount
		return unsubscribe;
	}, [scrollYProgress]);

	//toggelt de zichtbaarheid van de afbeelding
	const handleReveal = () => setImageVisible((prev) => !prev);

	//toggelt het tonen/verbergen van het 3d model
	const toggleModel = () => {
		setShowModel((prev) => !prev);
	};

	return (
		<section className="scene scene4" ref={sectionRef}>
			<div className="scene-sticky">
				<div className="background-image" />

				<div className="content">
					{/* afbeelding die langzaam zichtbaar wordt na klik */}
					<img src="/cat.png" alt="Reveal" className="interactive-image fade-image" style={{ opacity: imageVisible ? 1 : 0.2 }} onClick={handleReveal} />

					{/* knop om het 3d model te tonen of verbergen */}
					<img src="/watch.png" alt="Show 3D" className="interactive-image model-trigger" onClick={toggleModel} />
				</div>
			</div>

			{/* toont het 3d canvas wanneer showModel actief is */}
			{showModel && (
				<div className="model-overlay" onClick={() => setOrbitActive(true)}>
					<Canvas>
						<OrbitControls enableDamping enabled={orbitActive} enableZoom={false} />
						<Environment preset="sunset" />
						<Model />
					</Canvas>
				</div>
			)}

			{/* audiobestand dat via scroll wordt bediend */}
			<audio ref={audioRef} loop preload="auto">
				<source src="/soundscene4.mp3" type="audio/mpeg" />
			</audio>
		</section>
	);
};

//laadt en toont het .glb 3d model
function Model() {
	const { scene } = useGLTF("/watch.glb");
	return <primitive object={scene} scale={5} position={[0, -1, 0]} />;
}

//preload het model zodat het sneller wordt geladen wanneer nodig
useGLTF.preload("/watch.glb");

export default Scene4;
