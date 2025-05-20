import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/portal/Navigation.scss";

export const Navigation = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [activeTheme, setActiveTheme] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const themes = ["ROMANTIEK", "AVONTUUR", "GOED VS KWAAD", "MAGIE"];

	//handle click outside to close search and dropdown
	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(".dropdown_menu")) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="navigation_div1">
			<img src="/Logo.png" alt="logo" onClick={() => navigate("/")} />

			<div className="navigation_div2">
				<div className="navigation_div3">
					{isSearching ? (
						<input
							ref={inputRef}
							type="text"
							className="navigation_input"
							placeholder="Wat zoek je ..."
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setIsSearching(false);
								}
							}}
						/>
					) : (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									setIsDropdownOpen(!isDropdownOpen);
								}}
								className="nav_button"
							>
								<h1>SPROOKJES</h1>
							</button>

							{isDropdownOpen && (
								<div className="dropdown_menu">
									{themes.map((theme) => (
										<h2
											key={theme}
											className={activeTheme === theme ? "selected-theme" : ""}
											onClick={() => {
												setActiveTheme(theme);
												setIsDropdownOpen(false);
											}}
										>
											{theme}
										</h2>
									))}
								</div>
							)}

							<h1>MAKING OF</h1>
							<h1>ABOUT US</h1>
						</>
					)}
				</div>

				{/* magnifying glass for search*/}
				<button onClick={() => setIsSearching(!isSearching)}>
					<img src="/magnefyingglass.png" alt="magnefyingglass" />
				</button>
			</div>
		</div>
	);
};
