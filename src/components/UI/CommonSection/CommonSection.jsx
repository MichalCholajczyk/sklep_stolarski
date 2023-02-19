// Import React oraz komponent Container z biblioteki Reactstrap oraz stylów CSS dla sekcji common
import React from "react";
import { Container } from "reactstrap";
import "./commonsection.css";

// Definicja komponentu CommonSection przyjmującego props z tytułem
const CommonSection = ({ title }) => {
	// Zwrócenie sekcji z klasą common__section i komponentem Container, w którym znajduje się tytuł
	return (
		<section className="common__section">
			<Container className="text-center">
				<h1>{title}</h1>
			</Container>
		</section>
	);
};
export default CommonSection;
