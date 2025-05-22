import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../../styles/portal/Navigation.scss";
const base = import.meta.env.BASE_URL;

export const Navigation = () => {
	const [isSearching, setIsSearching] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const location = useLocation();

	const themes = ["AVONTUUR", "FANTASIE", "ROMANTIEK", "HORROR"];
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
			<img src={`${base}Logo.png`} alt="logo" onClick={() => navigate("/")} />
			<div className="navigation_div2">
				<div className="navigation_div3">
					{isSearching ? (
						<input
							ref={inputRef}
							type="text"
							className="navigation_input"
							placeholder="Wat zoek je ..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									if (searchTerm.trim()) {
										setSearchParams({ ...Object.fromEntries(searchParams), search: searchTerm.trim() });
									} else {
										searchParams.delete("search");
										setSearchParams(searchParams);
									}
									setIsSearching(false);
								}
							}}
						/>
					) : (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									if (location.pathname === "/") {
										//already on home: toggle dropdown
										setIsDropdownOpen((prev) => !prev);
									} else {
										//navigate to home, don't open dropdown immediately
										navigate("/");
									}
								}}
								className="nav_button"
							>
								<h1 className={location.pathname === "/" ? "active" : ""}>SPROOKJES</h1>
							</button>
							{isDropdownOpen && (
								<div className="dropdown_menu">
									{themes.map((theme) => (
										<h2
											key={theme}
											className={searchParams.get("theme") === theme ? "selected-theme" : ""}
											onClick={() => {
												const currentTheme = searchParams.get("theme");
												if (currentTheme === theme) {
													//if this theme is already active, remove it
													searchParams.delete("theme");
													setSearchParams(searchParams);
												} else {
													//otherwise, set it
													setSearchParams({ theme });
												}
												setIsDropdownOpen(false);
											}}
										>
											{theme}
										</h2>
									))}
								</div>
							)}
							<h1 onClick={() => navigate("/makingof/jordi-de-leeuw-alice-in-wonderland")} className={location.pathname.startsWith("/makingof") ? "active" : ""}>
								MAKING OF
							</h1>{" "}
							<h1 onClick={() => navigate("/about")} className={location.pathname === "/about" ? "active" : ""}>
								ABOUT US
							</h1>{" "}
						</>
					)}
				</div>

				{/* magnifying glass for search*/}
				<button onClick={() => {
					setIsSearching((prev) => {
						if (prev) setSearchTerm("");
						return !prev;
					});
				}}>
					<img src={`${base}magnefyingglass.png`} alt="magnefyingglass" />
				</button>
			</div>
		</div>
	);
};
