import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import { NavbarBrand } from "reactstrap";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="home" />} />
			<Route path="home" element={<Home />} />
			<Route path="shop" element={<Shop />} />
			<Route path="shop/:id" element={<ProductDetails />} />
			<Route path="cart" element={<Cart />} />
			<Route
				path="checkout"
				element={
					<ProtectedRoute>
						<Checkout />
					</ProtectedRoute>
				}
			/>
			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
		</Routes>
	);
};

export default Routers;
