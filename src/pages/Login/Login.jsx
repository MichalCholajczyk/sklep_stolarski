import React, { useState } from "react";
import "./login.css";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { getStorage } from "firebase/storage";

const Login = () => {
	// email state to store email input
	const [email, setEmail] = useState("");
	// password state to store password input
	const [password, setPassword] = useState("");
	// loading state to show loading spinner when submitting form
	const [loading, setLoading] = useState(false);
	// useNavigate hook to redirect user to the checkout page after successful login
	const navigate = useNavigate();

	// function to handle login form submission
	const signIn = async (e) => {
		// prevent default form submission
		e.preventDefault();
		setLoading(true);

		try {
			// this function will sign in user if email and password match
			const userCredential = await signInWithEmailAndPassword(auth, email, password, getStorage);

			const user = userCredential.user;

			console.log(user);
			setLoading(false);
			toast.success("zalogowanooo");
			navigate("/checkout");
		} catch (error) {
			setLoading(false);
			toast.error(error.message);
		}
	};
	return (
		<Helmet title="Login">
			<section>
				<Container>
					<Row>
						{loading ? (
							<Col lg="12" className="text-center">
								<h5 className="fw-bold">Loading.....</h5>
							</Col>
						) : (
							<Col lg="6" className="m-auto text-center">
								<h3 className="fw-bold mb-4">Login</h3>

								<Form className="auth__form" onSubmit={signIn}>
									<FormGroup className="form__group">
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
										/>
									</FormGroup>
									<FormGroup className="form__group">
										<input
											type="current-password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Enter your password"
										/>
									</FormGroup>

									<button type="submit" className="buy__btn auth__btn">
										Login
									</button>
									<p>
										Dont have an account?
										<Link to="/signup"> Create an account</Link>
									</p>
								</Form>
							</Col>
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Login;
