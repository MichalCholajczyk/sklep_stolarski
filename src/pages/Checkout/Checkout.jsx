// Importowanie potrzebnych modułów i komponentów
import React from "react";
import "./checkout.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection/CommonSection";

import { useSelector } from "react-redux";

const Checkout = () => {
	// Pobranie danych z koszyka przy pomocy hooka useSelector
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	return (
		// Ustawienie tytułu dla strony przy pomocy komponentu Helmet
		<Helmet title="Checkout">
			{/* Dodanie sekcji Checkout przy pomocy komponentu CommonSection */}
			<CommonSection title="Checkout" />
			<section>
				{/* Utworzenie formularza z danymi do faktury */}
				<Container>
					<Row>
						<Col lg="8">
							<h6 className="mb-4 fw-bold">Billing Information</h6>
							<Form className="billing__form">
								<FormGroup className="form__group">
									<input type="text" placeholder="Enter ur name" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="email" placeholder="Enter ur email" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="number" placeholder="Enter ur phone number" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Enter ur strit address" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Enter ur postal code" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Enter ur city name" />
								</FormGroup>

								<FormGroup className="form__group">
									<input type="text" placeholder="Enter ur country" />
								</FormGroup>
							</Form>
						</Col>
						<Col lang="4">
							{/* Wyświetlenie podsumowania zamówienia */}
							<div className="checkout__cart">
								<h6>
									Total Quantity: <span>{totalQuantity} itemków</span>
								</h6>
								<h6>
									Subtotal: <span>${totalAmount}</span>
								</h6>
								<h6>
									<span>
										Shipping: <br />
										free shipping
									</span>
									<span>$0</span>
								</h6>
								<h4>
									Total Cost: <span>${totalAmount}</span>
								</h4>
								<button className="buy__btn final__buy__btn auth__btn w-100">Złóż zamówienie/pakt z diabłem</button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Checkout;
