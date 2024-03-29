import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ProtectedRoute from "./ProtectedRoute";

import AddProducts from "../admin/AddProducts/AddProducts";
import AllProducts from "../admin/AllProducts/AllProducts";
import Dashboard from "../admin/Dashboard/Dashboard";
import Users from "../admin/Users/Users";
import Favorites from "../components/Favorites/Favorities";

const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="home" />} />
			<Route path="home" element={<Home />} />
			<Route path="shop" element={<Shop />} />
			<Route path="shop/:id" element={<ProductDetails />} />
			<Route path="cart" element={<Cart />} />
			<Route path="/favorites" element={<Favorites />} />


			<Route path="/*" element={<ProtectedRoute />}>
				<Route path="checkout" element={<Checkout />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="dashboard/all-products" element={<AllProducts />} />
				<Route path="dashboard/add-product" element={<AddProducts />} />
				<Route path="dashboard/users" element={<Users />} />
			</Route>

			<Route path="login" element={<Login />} />
			<Route path="signup" element={<Signup />} />
		</Routes>
	);
};

export default Routers;
