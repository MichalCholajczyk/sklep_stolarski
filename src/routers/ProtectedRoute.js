import React from "react";
import useAuth from "../custom-hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const { currentUser } = useAuth();
	// jeśli currentUser jest prawdziwy, zwróć komponent Outlet, w przeciwnym wypadku przekieruj do strony logowania
	return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
