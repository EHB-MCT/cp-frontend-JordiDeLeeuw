import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Fairytale from "./pages/Fairytale.tsx";

import "./styles/App.scss";
import { Footer } from "./components/portal/Footer";
import { Navigation } from "./components/portal/Navigation";

function App() {
	return (
		<Router>
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/fairytale" element={<Fairytale />} />
			</Routes>
			<Footer />
		</Router>
	);
}
export default App;
