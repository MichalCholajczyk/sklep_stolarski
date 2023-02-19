import React from "react";

import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";

import "./services.css";

// Import danych usług
import serviceData from "../assets/data/serviceData";

const Services = () => {
	return (
		<section className="services">
			``
			<Container>
				<Row>
					{
						// Mapowanie danych usług i renderowanie dla każdej z nich komponentu Col

						serviceData.map((item, index) => (
							<Col lg="3" md="4" key={index}>
					    		<motion.div whileHover={{ scale: 1.1 }}>
									<div className="service__item" style={{ background: `${item.bg}` }}>
										<span>
											<i class={item.icon}></i>
										</span>
										<div>
											<h3>{item.title}</h3>
											<p>{item.subtitle}</p>
										</div>
									</div>
								</motion.div>
							</Col>
						))
					}
				</Row>
			</Container>
		</section>
	);
};

export default Services;
