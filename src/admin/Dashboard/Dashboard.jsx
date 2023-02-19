// Importowanie niezbędnych modułów
import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./dashboard.css";

// Importowanie hooka do pobierania danych
import useGetData from "../../custom-hooks/useGetData";

const Dashboard = () => {
	// Pobieranie danych produktów i użytkowników z użyciem hooka
	const { data: products } = useGetData("products");
	const { data: users } = useGetData("users");

	// Renderowanie sekcji z danymi statystycznymi
	return (
		<>
			<section>
				<Container>
					<Row>
						<Col className="lg-3">
							<div className="revenue__box">
								<h5>Total Sales</h5>
								<span>$2317</span>
							</div>
						</Col>
						<Col className="lg-3">
							<div className="order__box">
								<h5>Orders</h5>
								<span>69</span>
							</div>
						</Col>
						<Col className="lg-3">
							<div className="products__box">
								<h5>Total Products</h5>
								<span>{products.length}</span>
							</div>
						</Col>
						<Col className="lg-3">
							<div className="users__box">
								<h5>Total Users</h5>
								<span>{users.length}</span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Dashboard;
