// Importowanie potrzebnych bibliotek i modułów

import React, { useRef, useEffect } from "react";

import { NavLink, useNavigate, Link } from "react-router-dom";
import "./header.css";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

// Deklaracja listy linków w nagłówku

const nav__links = [
	{
		path: "home",
		display: "Home",
	},
	{
		path: "shop",
		display: "Shop",
	},
	{
		path: "cart",
		display: "Cart",
	},
	{
		path: "login",
		display: "Login",
	},
];

// Deklaracja komponentu nagłówka

const Header = () => {
	// Ustawienie referencji do elementów DOM
	const favorites = useSelector((state) => state.favorites.favorites); // nowy kod


	const headerRef = useRef(null);

	const menuRef = useRef(null);
	const navigate = useNavigate();
	// Pobranie bieżącego użytkownika
	const { currentUser } = useAuth();

	// Pobranie ilości produktów w koszyku

	const totalQuantity = useSelector((state) => state.cart.totalQuantity);

	const profileActionRef = useRef(null);

	// Funkcja dodająca klasę "sticky__header" do nagłówka po przewinięciu strony o 80 pikseli

	const stickyHeaderFunction = () => {
		window.addEventListener("scroll", () => {
			if (document.body.scrollTo > 80 || document.documentElement.scrollTop > 80) {
				headerRef.current.classList.add("sticky__header");
			} else {
				headerRef.current.classList.remove("sticky__header");
			}
		});
	};

	// Funkcja wylogowująca użytkownika

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success("logged out successfully");
				navigate("/home");
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	// Ustawienie efektu odświeżania dla funkcji dodającej klasę "sticky__header"

	useEffect(() => {
		stickyHeaderFunction();

		return () => window.removeEventListener("scroll", stickyHeaderFunction);
	});

	// Funkcja pokazująca/ukrywająca menu

	const menuToggle = () => menuRef.current.classList.toggle("active__menu");


	const navigateTofavourities = () => {
		navigate("/favorites");
	};

	// Funkcja przekierowująca do koszyka

	const navigateToCart = () => {
		navigate("/cart");
	};

	// Funkcja pokazująca/ukrywająca sekcję z akcjami użytkownika

	const toggleProfileActions = () => profileActionRef.current.classList.toggle("show__profileActions");

	return (
		<header className="header" ref={headerRef}>
			<Container>
				<Row>
					<div className="nav__wrapper">
						<div className="logo">
							<img src={logo} alt="logo" />
							<div>
								<h1>PicobelloStrona</h1>
							</div>
						</div>

						<div className="navigation" ref={menuRef} onClick={menuToggle}>
							<ul className="menu">
								{nav__links.map((item, index) => (
									<li className="nav__item" key={index}>
										<NavLink to={item.path} className={(navClass) => (navClass.isActive ? "nav__active" : "")}>
											{item.display}
										</NavLink>
									</li>
								))}
							</ul>
						</div>

						<div className="nav__icons">
							<span className="fav__icon"
							onClick={navigateTofavourities}>
								<i class="ri-heart-line"></i>
								<span className="badge">{favorites.length}</span>
							</span>
							<span className="cart__icon" onClick={navigateToCart}>
								<i class="ri-shopping-cart-2-line"></i>
								<span className="badge">{totalQuantity}</span>
							</span>

							<div className="profile">
								<motion.img
									whileTap={{ scale: 1.2 }}
									src={currentUser ? currentUser.photoURL : userIcon}
									alt="chuj"
									onClick={toggleProfileActions}
								/>

								<div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
									{currentUser ? (
										<span onClick={logout}>Logout</span>
									) : (
										<div className="d-flex align-items-center justify-content-center flex-column">
											<Link to="/signup">Signup</Link>
											<Link to="/login">Login</Link>
											<Link to="/dashboard">Dashboard</Link>
										</div>
									)}
								</div>
							</div>
							<div className="mobile__menu">
								<span onClick={menuToggle}>
									<i class="ri-menu-line"></i>
								</span>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</header>
	);
};

export default Header;
