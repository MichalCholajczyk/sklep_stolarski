import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


// Import React i kilka modułów z react-router i bibliotek zewnętrznych oraz kilka komponentów i hooków React
import React, { useState, useRef, useEffect } from "react";
import "./productDetails.css";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import CommonSection from "../../components/UI/CommonSection/CommonSection";
import { motion } from "framer-motion";
import ProductsList from "../../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

// Import Firebase i hook useGetData do pobierania danych z bazy danych Firebase
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../../custom-hooks/useGetData";

// Utwórz komponent ProductDetails, który pobiera dane produktu z bazy danych Firebase i wyświetla je na stronie
const ProductDetails = () => {
	// Użyj hook useState do przechowywania danych produktu (nazwy, opisu, obrazka, kategorii, ceny)
	const [product, setProduct] = useState({
		imgUrls: [],
		productName: "",
		price: "",
		description: "",
		shortDesc: "",
		category: "",
	});
	// Użyj hook useState do przechowywania wybranej karty (opis lub recenzje)
	const [tab, setTab] = useState("desc");
	// Użyj hook useState do przechowywania oceny produktu
	const [rating, setRating] = useState(null);
	// Użyj hook useRef do odwołania się do inputów użytkownika
	const reviewUser = useRef("");
	const reviewMsg = useRef("");
	// Użyj hook useDispatch do wysłania akcji do magazynu w celu dodania przedmiotu do koszyka
	const dispatch = useDispatch();
	// Użyj hook useParams do pobrania ID produktu z adresu URL
	const { id } = useParams();
	// Użyj hook useGetData, aby pobrać listę produktów z bazy danych Firebase
	const { data: products } = useGetData("products");
	// Użyj funkcji doc i getDoc z pakietu firebase/firestore, aby pobrać dane produktu z bazy danych Firebase na podstawie jego ID
	const docRef = doc(db, "products", id);
	useEffect(() => {
		const getProduct = async () => {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setProduct(docSnap.data());
			} else {
				console.log("Product not found");
			}
		};
		getProduct();
	}, []);
	// Wyodrębnij zmienne z obiektu produktu za pomocą destrukturyzacji
	const { imgUrl, productName, price, /* avgRating, reviews, */ description, shortDesc, category } = product;
	// Użyj metody filter, aby wybrać produkty z tej samej kategorii
	const relatedProducts = products.filter((item) => item.category === category);
	// Utwórz funkcję do obsługi zdarzenia submit, która zbiera dane recenzji produktu i wysyła je do magazynu Redux
	const submitHandler = (e) => {
		e.preventDefault();

		const reviewUserName = reviewUser.current.value;
		const reviewUserMsg = reviewMsg.current.value;

		console.log(reviewUserName, reviewUserMsg, rating);

		const reviewObj = {
			userName: reviewUserName,
			text: reviewUserMsg,
			rating,
		};

		console.log(reviewObj);
		toast.success("Recenzja zgłoszona");
	};

	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id,
				image: imgUrl,
				productName,
				price,
			})
		);

		toast.success("dodano do koszyka");
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [product]);

	return (
		<Helmet title={productName}>
			<CommonSection title={productName} />

			<section className="pt-0">
				<Container>
					<Row>
					<Col lg="6">
    {product.imgUrls.length ? (
        <Carousel>
            {product.imgUrls.map((url, index) => (
                <div key={index}>
                    <img src={url} alt={productName} />
                </div>
            ))}
        </Carousel>
    ) : (
        <p>Brak obrazów dla tego produktu.</p>
    )}
</Col>

						<Col lg="6">
							<div className="product__details">
								<h2>{productName}</h2>
								<div className="product__rating d-flex align-items-center gap-5 mb-3">
									<div>
										<span>
											<i class="ri-star-fill"></i>
										</span>
										<span>
											<i class="ri-star-fill"></i>
										</span>
										<span>
											<i class="ri-star-fill"></i>
										</span>
										<span>
											<i class="ri-star-fill"></i>
										</span>
										<span>
											<i class="ri-star-half-s-line"></i>
										</span>
									</div>
									<p>{/* (Ocena: <span>{avgRating}</span>/5) */}</p>
								</div>
								<div className="d-flex align-items-center gap-5">
									<span className="product__price">${price} </span>
									<span> Category: {category.toUpperCase()}</span>
								</div>
								<p className="mt-3">{shortDesc}</p>

								<motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}>
									Dodaj do koszyka
								</motion.button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<Container>
					<Row>
						<Col lg="12">
							<div className="tab__wrapper d-flex align-items-center gap-5">
								<h6 className={`${tab === "desc" ? "active__tab" : " "}`} onClick={() => setTab("desc")}>
									Opis
								</h6>
								<h6 className={`${tab === "rev" ? "active__tab" : " "}`} onClick={() => setTab("rev")}>
									Recenzje
								</h6>
							</div>

							{tab === "desc" ? (
								<div className="tab__content mt-5">
									<p>{description}</p>
								</div>
							) : (
								<div className="product__review mt-5">
									<div className="review__wrapper">
										{/* 										<ul>
											{reviews?.map((item, index) => (
												<li key={index} className="mb-4">
													<h6>Nazwa użytkownika</h6>
													<span>{item.rating} (ocena)</span>
													<p>{item.text}</p>
												</li>
											))}
										</ul> */}
										<div className="review__form">
											<h4>Leave your experience</h4>
											<form action="" onSubmit={submitHandler}>
												<div className="form__group">
													<input type="text" placeholder="Enter name" ref={reviewUser} required />
												</div>

												<div className="form__group d-flex align-items-center gap-5 group__rating">
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
														1<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
														2<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
														3<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
														4<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
														5<i class="ri-star-s-fill"></i>
													</motion.span>
												</div>

												<div className="form__group">
													<textarea ref={reviewMsg} rows={4} type="text" placeholder="Review Message..." required />
												</div>

												<motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy__btn">
													Submit
												</motion.button>
											</form>
										</div>
									</div>
								</div>
							)}
						</Col>
						<Col lg="12" className="mt-5">
							<h2 className="related__title">Oddaj sie swojemu zakupoholizmowi</h2>
						</Col>
						<ProductsList data={relatedProducts} />
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default ProductDetails;
