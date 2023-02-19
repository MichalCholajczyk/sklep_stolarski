// Import biblioteki React
import React from "react";

// Import komponentu ProductCard
import ProductCard from "./ProductCard/ProductCard";

// Definicja komponentu ProductsList
const ProductsList = ({ data }) => {
	// Zwracamy listę komponentów ProductCard dla każdego elementu tablicy data
	return (
		<>
			{data?.map((item, index) => (
				<ProductCard item={item} key={index} />
			))}
		</>
	);
};
export default ProductsList;
