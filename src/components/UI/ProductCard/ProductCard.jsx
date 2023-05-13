// Importowanie potrzebnych komponentów i stylów
import React from "react";
import { motion } from "framer-motion";
import "./product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

// Importowanie funkcji i komponentów z Redux
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { addFavorite } from '../../../redux/favoritesSlice';





// Funkcja wyświetlająca pojedynczą kartę produktu
const ProductCard = ({ item, hideFavoriteButton }) => {
	const defaultImgUrl = ""; // URL do domyślnego zdjęcia lub pusty string

	const imgUrl = item.imgUrls && item.imgUrls.length > 0 ? item.imgUrls[0] : defaultImgUrl;

	const addToFavorites = () => {
		dispatch(addFavorite({
			id: item.id,
				productName: item.productName,
				price: item.price,
				imgUrl: imgUrl,
		})
		);
		toast.success("Product added to favorites");
	};
	
	
	// Deklaracja funkcji dispatch z Redux
	const dispatch = useDispatch();

	// Funkcja dodająca produkt do koszyka i wyświetlająca komunikat Toast
	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id: item.id,
				productName: item.productName,
				price: item.price,
				imgUrl: imgUrl,
			})
		);

		toast.success("Product added to cart");
	};

	// Wyświetlenie karty produktu z danymi przekazanymi przez propsy

	return (
		<Col lg="3" md="4" className="mb-2">
			<div className="product__item">
				<div className="product__img">
					<Link to={`/shop/${item.id}`}>
					<motion.img whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.8 }} src={imgUrl} alt="tak" />

					</Link>
				</div>
				<div className="p-2 product__info">
					<h3 className="product__name">
						<Link to={`/shop/${item.id}`}>{item.productName}</Link>
					</h3>
					<span>{item.category}</span>
				</div>
				<div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
					<span className="price">${item.price}</span>
					<motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
						<i class=" roundBuy__btn ri-add-line"></i>
					</motion.span>{!hideFavoriteButton && (
						<motion.span whileTap={{ scale: 1.2 }}  onClick={addToFavorites}>
						<i class=" roundBuy__btn1 ri-heart-add-line "></i>
					</motion.span>
					)}
				</div>
				
			</div>
		</Col>
	);
};

export default ProductCard;
