// Importowanie potrzebnych elementów Reacta i stylów
import React, { useState } from "react";
import "./shop.css";

// Importowanie komponentów z folderu components/UI oraz komponentu Helmet
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import Helmet from "../../components/Helmet/Helmet.js";

// Importowanie komponentów z biblioteki Reactstrap
import { Container, Row, Col } from "reactstrap";

// Importowanie danych z pliku products.js oraz komponentu ProductsList
import products from "../../assets/data/products";
import ProductsList from "../../components/UI/ProductsList";

// Funkcja filtrująca produkty po kategorii

const Shop = () => {
	// Ustawianie stanu początkowego danych o produktach

	const [productsData, setProductsData] = useState(products);

	// Funkcja filtrująca produkty po kategorii

	const handleFilter = (e) => {
		const filterValue = e.target.value;
		if (filterValue === "sofa") {
			const filteredProducts = products.filter((item) => item.category === "sofa");
			setProductsData(filteredProducts);
		}

		if (filterValue === "watch") {
			const filteredProducts = products.filter((item) => item.category === "watch");
			setProductsData(filteredProducts);
		}

		if (filterValue === "chair") {
			const filteredProducts = products.filter((item) => item.category === "chair");
			setProductsData(filteredProducts);
		}

		if (filterValue === "wireless") {
			const filteredProducts = products.filter((item) => item.category === "wireless");
			setProductsData(filteredProducts);
		}

		if (filterValue === "mobile") {
			const filteredProducts = products.filter((item) => item.category === "mobile");
			setProductsData(filteredProducts);
		}
	};

	// Funkcja wyszukująca produkty po nazwie

	const handleSearch = (e) => {
		if (e.key === "Enter") {
			const searchTerm = e.target.value;

			const searchedProducts = products.filter((item) =>
				item.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);

			setProductsData(searchedProducts);
		}
	};

	return (
		<Helmet title="Shop">
			{/* Komponent CommonSection z tytułem "Products" */}

			<CommonSection title="Products" />

			{/* Sekcja z filtrami i polem wyszukiwania */}

			<section>
				<Container>
					<Row>
						<Col lg="3" md="6">
							<div className="filter__widget">
								<select onChange={handleFilter}>
									<option>Filter by category</option>
									<option value="sofa">Sofa</option>
									<option value="mobile">Mobile</option>
									<option value="chair">Chair</option>
									<option value="watch">Watch</option>
									<option value="wireless">Wireless</option>
								</select>
							</div>
						</Col>
						<Col lg="3" md="6" className="text-end">
							<div className="filter__widget">
								<select name="" id="">
									<option>Sort by</option>
									<option value="ascending">Ascending</option>
									<option value="descending">Descending</option>
								</select>
							</div>
						</Col>
						<Col lg="6" md="12">
							<div className="search__box">
								<input type="text" placeholder="Search......" onKeyDown={handleSearch} />

								{/* //! zrobić żeby lupa działała jako guzik enter */}
								<span>
									<i class="ri-search-line"></i>
								</span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section className="pt-0">
				<Container>
					<Row>
						{productsData.length === 0 ? (
							<h1 className="text-center fs-4">Brak produktu wariacie</h1>
						) : (
							<ProductsList data={productsData} />
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Shop;
