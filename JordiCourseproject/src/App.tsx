import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Fairytale from "./pages/Fairytale.tsx";
import MakingOf from "./pages/MakingOf.tsx";

import "./styles/App.scss";
import { Footer } from "./components/portal/Footer";
import { Navigation } from "./components/portal/Navigation";

function App() {
	return (
		<Router basename="/cp-frontend-JordiDeLeeuw">
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/fairytale" element={<Fairytale />} />
				<Route path="/makingof/:id" element={<MakingOf />} />
			</Routes>

			<Footer />
		</Router>
	);
}
export default App;
