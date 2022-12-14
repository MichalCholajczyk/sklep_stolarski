import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../../assets/data/products";

import Helmet from "../../components/Helmet/Helmet";
import "./home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assets/images/hero-img.png"

import Services from "../../services/Services";
import ProductsList from "../../components/UI/ProductsList";

import Clock from "../../components/UI/Clock/Clock";

import counterImg from "../../assets/images/counter-timer-img.png";

const Home = () => {
	const [trendingProducts, setTrendingProducts] = useState([]);
	const [bestSalesProducts, setBestSalesProducts] = useState([]);
	const [mobileProducts, setMobileProducts] = useState([]);
	const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

	const year = new Date().getFullYear();

	
	useEffect(() => {
		const filteredTrendingProducts = products.filter((item) => item.category === "chair");

		const filteredBestSalesProducts = products.filter((item) => item.category === "sofa");

		const filteredMobileProducts = products.filter((item) => item.category === "mobile");

		const filteredWirelessProducts = products.filter((item) => item.category === "wireless");

    const filteredPopularProducts = products.filter((item) => item.category === "watch");

		setTrendingProducts(filteredTrendingProducts);
		setBestSalesProducts(filteredBestSalesProducts);
		setMobileProducts(filteredMobileProducts);
		setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);

	}, []);

	return (
		<Helmet title={"Home"}>

{/*============================================================ Hero ============================================================*/}

			<section className="hero__section">
				<Container>
					<Row>
						<Col lg="6" md="6">
							<div className="hero__content">
								<p className="hero__subtitle">Trending kurwa w roku {year}</p>
								<h2>Reject Plastik fantastik, Embrace drewno</h2>
								<p>
									Both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in
									a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it
									don't belong to me. Besides, I've already been through too much shit this morning over this case to
									hand it over to your dumb ass.
								</p>

								<motion.button whileTap={{ scale: 1.1 }} className="buy__btn">
									<Link to="/shop">NO WE KUP</Link>
								</motion.button>
							</div>
						</Col>

						<Col lg="6" md="6">
							<div className="hero__img">
								<img src={heroImg} alt="chuj" />
							</div>
						</Col>
					</Row>
				</Container>
			</section>

{/*============================================================ Services ============================================================*/}

			<Services />

{/*============================================================ Trending Products ============================================================*/}


			<section className="trending__products">
				<Container>
					<Row>
						<Col lg="12">
							<h2 className="section__title">Trending prodakts</h2>
						</Col>
						<ProductsList data={trendingProducts} />
					</Row>
				</Container>
			</section>

{/*============================================================ Best Sales ============================================================*/}

			<section className="best__sales">
				<Container>
					<Row>
						<Col lg="12">
							<h2 className="section__title">Rzeczy na kt??rych najlepiej trzepiemy kase</h2>
						</Col>
						<ProductsList data={bestSalesProducts} />
					</Row>
				</Container>
			</section>

{/*============================================================ Limited Offer ============================================================*/}


			<section className="timer__count">
				<Container>
					<Row>
						<Col lg="6" md="12" className="count__down-col">
							<div className="clock__top-content">
								<h4 className="text-white fs-6 mb-2">Limmited offer</h4>
								<h3 className="text-white fs-5 mb-3">Dojcze k??alitat krzes??o</h3>
							</div>
							<Clock />

							<motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
								<Link to="/shop">Visit Store</Link>
							</motion.button>
						</Col>
						<Col lg="6" md="12" className="text-end counter__img">
							<img src={counterImg} alt="" />
						</Col>
					</Row>
				</Container>
			</section>

{/*============================================================ New Arrivals ============================================================*/}

			<section className="new__arrivals">
				<Container>
					<Row>
						<Col lg="12" className="text-center mb-5">
							<h2 className="section__title">Nowo??ci ??wie??utkie jak ruscy poborowi na froncie</h2>
						</Col>
						<ProductsList data={mobileProducts} />
						<ProductsList data={wirelessProducts} />
					</Row>
				</Container>
			</section>

{/*============================================================ Popular Category ============================================================*/}

			<section className="popular__category">
				<Container>
					<Row>
						<Col lg="12" className="text-center mb-5">
							<h2 className="section__title">Popularne w danej kategorii</h2>
						</Col>
						<ProductsList data={popularProducts} />

					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Home;
