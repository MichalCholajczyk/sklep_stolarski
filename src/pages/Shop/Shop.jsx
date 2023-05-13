import React, { useState, useEffect } from "react";
import "./shop.css";

import CommonSection from "../../components/UI/CommonSection/CommonSection";
import Helmet from "../../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";
import ProductsList from "../../components/UI/ProductsList";
import { db } from "../../firebase.config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const Shop = () => {
	const [productsData, setProductsData] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState("");
	const [priceSort, setPriceSort] = useState("");
	

	useEffect(() => {
		const fetchData = async () => {
			let q = query(collection(db, "products"));

			if (categoryFilter) {
				q = query(q, where("category", "==", categoryFilter));
			}

			if (priceSort) {
				q = query(q, orderBy("price", priceSort));
			}

			const querySnapshot = await getDocs(q);
			setProductsData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		fetchData();
	}, [categoryFilter, priceSort]);

	const handleFilter = (e) => {
		setCategoryFilter(e.target.value);
	};

	const handleSort = (e) => {
		setPriceSort(e.target.value);
	};

	return (
		<Helmet title="Shop">
			<CommonSection title="Products" />

			<section>
				<Container>
					<Row>
						<Col lg="3" md="6">
							<div className="filter__widget">
								<select onChange={handleFilter}>
									<option value="">Filter by category</option>
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
								<select onChange={handleSort}>
									<option value="">Sort by</option>
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
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
