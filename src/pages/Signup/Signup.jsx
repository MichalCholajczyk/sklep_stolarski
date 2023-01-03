import React, { useState } from "react";
import "./signup.css";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase.config.js";
import { storage } from "../../firebase.config.js";
import { db } from "../../firebase.config.js";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const signup = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			const user = userCredential.user;

			const storageRef = ref(storage, `images/${Date.now() + username}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					toast.error(error.message);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						//update user profile
						await updateProfile(user, {
							displayName: username,
							photo: downloadURL,
						});

						//store user data in firestore database
						await setDoc(doc(db, "users", user.uid), {
							uid: user.uid,
							displayName: username,
							email,
							photoURL: downloadURL,
						});
					});
				}
			);

			//			console.log(user);
			setLoading(false);
			toast.success("Podpisałeś pakt z diabłem/ stworzyłeś konto");
			navigate("/login");
		} catch (error) {
			setLoading(false);
			toast.error("Program zrobił salto przez okno");
		}
	};

	return (
		<Helmet title="Signup">
			<section>
				<Container>
					<Row>
						{loading ? (
							<Col lg="12" className="text-center">
								<h5 className="fw-bold">Ładowanko.....</h5>
							</Col>
						) : (
							<Col lg="6" className="m-auto text-center">
								<h3 className="fw-bold mb-4">Signup</h3>

								<Form className="auth__form" onSubmit={signup}>
									<FormGroup className="form__group">
										<input
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="Enter your Username"
										/>
									</FormGroup>

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
									<FormGroup className="form__group">
										<input type="file" onChange={(e) => setFile(e.target.files[0])} />
									</FormGroup>

									<button type="submit" className="buy__btn auth__btn">
										Create an account
									</button>
									<p>
										Already have an account? <Link to="/login"> Login</Link>
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

export default Signup;
