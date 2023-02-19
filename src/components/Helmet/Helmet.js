import React from "react";

// Funkcja komponentu, która przyjmuje props
const Helmet = (props) => {
	// Ustawia tytuł strony na wartość props.title
	document.title = "ZajebistaStrona -" + props.title;

	// Zwraca element JSX, który zawiera dzieci przekazane przez props
	return <div className="w-100">{props.children}</div>;
};

export default Helmet;
