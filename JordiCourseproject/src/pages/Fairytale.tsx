import Scene1 from "../components/fairtytale/Scene1";
import Scene2 from "../components/fairtytale/Scene2";
import Scene3 from "../components/fairtytale/Scene3";
import Scene4 from "../components/fairtytale/Scene4";
import Scene5 from "../components/fairtytale/Scene5";
import PlayingCard from "../components/fairtytale/PlayingCard";
import "../styles/fairytale/Fairytale.scss";
import { motion, useScroll } from "framer-motion";

const base = import.meta.env.BASE_URL;

const Fairytale = () => {
	const { scrollYProgress } = useScroll();

	return (
		<div className="fairytale">
			<motion.div
				className="scroll-line"
				style={{
					scaleY: scrollYProgress,
					transformOrigin: "top center",
				}}
			/>
			<img src={`${base}name.png`} alt="" className="name" />
			<PlayingCard suit="♦" value="5">
				Welkom in het verhaal van alice, een meisje dat haar dag begon in stilte, tot een haastig konijn haar wereld op z'n kop zette. ze stond op en volgde zonder aarzelen.
			</PlayingCard>
			<Scene1 />
			<PlayingCard suit="♠" value="7">
				Ze liep en liep en liep, het konijn net binnen handbereik. maar net toen ze hem bijna te pakken had, verdween de grond onder haar.
			</PlayingCard>
			<Scene2 />
			<PlayingCard suit="♦" value="3">
				Ze bleef maar vallen. niet snel, niet langzaam gewoon eindeloos. alsof de tijd zelf even vergat wat boven en onder was.
			</PlayingCard>
			<Scene3 />
			<PlayingCard suit="♣" value="9">
				Na eindelijk klein genoeg te zijn, paste alice door het kleine deurtje. Aan de andere kant… wachtte een nieuw gezicht dat ze nog nooit had gezien.
			</PlayingCard>
			<Scene4 />
			<PlayingCard suit="♥" value="Q">
				Na een bizar theefeest werd alice plots meegenomen. Voordat ze het wist, stond ze oog in oog met de hartenkoningin.
			</PlayingCard>
			<Scene5 />
		</div>
	);
};

export default Fairytale;
