// Importujemy potrzebne komponenty
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import AdminNav from "../../admin/AdminNav/AdminNav";
import { useLocation } from "react-router-dom";

// Deklarujemy komponent Layout
const Layout = () => {
	// Pobieramy informacje o aktualnej lokalizacji za pomocą hooka useLocation z react-router-dom
	const location = useLocation();

	return (
		<>
			{
				// Sprawdzamy, czy aktualna lokalizacja to /dashboard i renderujemy AdminNav lub Header w zależności od wyniku
				location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />
			}
			<div>
				<Routers />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
