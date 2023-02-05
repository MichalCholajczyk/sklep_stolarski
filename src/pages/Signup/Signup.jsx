// Importing necessary modules from React, reactstrap, and firebase
import React, { useState } from "react";
import "./signup.css";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

// Importing firebase authentication and storage functions
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

// Importing firebase configuration
import { auth, db } from "../../firebase.config";

// Importing toast for error and success notifications
import { toast } from "react-toastify";

// Signup component using functional component
const Signup = () => {
// Setting up state for form inputs and file
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);

// Setting up navigation hook
const navigate = useNavigate();

// Function to handle form submission
const signup = async (e) => {
e.preventDefault();
setLoading(true);

try {
  // Creating user with email and password
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Getting user object from credential
  const user = userCredential.user;

	const storage = getStorage();

  // Setting up storage reference and uploading file
  const storageRef = ref(storage, `images/${Date.now() + username}`)
	const metadata = {
		contentType: 'image/jpeg',
	};
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Handling errors and success during file upload
  uploadTask.on(
    (error) => {
      toast.error(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        // Updating user profile with display name and photoURL
        await updateProfile(user, {
          displayName: username,
          photoURL: downloadURL,
        });

        // Storing user data in firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: username,
          email,
          photoURL: downloadURL,
        });
      });
    }
  );
  setLoading(false);
  // Showing success notification
  toast.success("Podpisałeś pakt z diabłem/ stworzyłeś konto");
  // Navigating to login page
  navigate("/login");
} catch (error) {
  // Showing error notification
  setLoading(false);
  toast.error("Program zrobił salto przez okno");
}
}

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
										<input type="file" accept="image/jpeg" 
										
										//!zdjęcie zapisywało tylko nazwe i miało 9B bo nie było tego [0]. Niemam pojęcia jak to działa ale tak to zostawie bo zadziało. Działa tylko jpeg, ni chuja niewiem czemu png nie działa ale nie wnikam XD
										onChange={(e) => setFile(e.target.files[0])} />
										<p>File must be a jpeg </p>
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


