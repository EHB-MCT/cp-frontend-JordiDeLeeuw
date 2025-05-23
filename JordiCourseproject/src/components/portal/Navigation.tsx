import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "../../styles/portal/Navigation.scss";
const base = import.meta.env.BASE_URL;

//define and export the Navigation component
//this component is responsible for the navigation bar at the top of the page
//it contains the logo, the search bar, and the navigation buttons
//it also handles the dropdown menu for the themes and the search functionality
export const Navigation = () => {
	//state for serach bar toggle
	const [isSearching, setIsSearching] = useState(false);
	//state for dropdown menu toggle
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	//state for search term
	const [searchTerm, setSearchTerm] = useState("");
	//this is used to get the current search params from the url
	const [searchParams, setSearchParams] = useSearchParams();
	//ref to control focus on search input element
	const inputRef = useRef<HTMLInputElement>(null);
	//initialize navigation function and location
	const navigate = useNavigate();
	const location = useLocation();

	//predefined theme categories
	const themes = ["AVONTUUR", "FANTASIE", "ROMANTIEK", "HORROR"];
	//handle click outside to close search and dropdown
	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest(".dropdown_menu")) {
			setIsDropdownOpen(false);
		}
	};
	//attach outside click event listener to the document
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	//render the navigation bar with logo, search bar, and navigation buttons
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
							{/* sprookjes button - toggles dropdown if already on home, else navigates */}
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
							{/* theme dropdown */}
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
				<button
					onClick={() => {
						setIsSearching((prev) => {
							if (prev) setSearchTerm("");
							return !prev;
						});
					}}
				>
					<img src={`${base}magnefyingglass.png`} alt="magnefyingglass" />
				</button>
			</div>
		</div>
	);
};
