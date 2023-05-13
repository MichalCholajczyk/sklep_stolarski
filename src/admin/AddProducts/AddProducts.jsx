// AddProducts.jsx

import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
	const [enterTitle, setEnterTitle] = useState("");
	const [enterShortDescription, setEnterShortDescription] = useState("");
	const [enterDescription, setEnterDescription] = useState("");
	const [enterPrice, setEnterPrice] = useState("");
	const [enterCategory, setEnterCategory] = useState("");
	const [enterProductImg, setEnterProductImg] = useState([]);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const addProduct = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const docRef = await collection(db, "products");
			const imgUrls = [];

			for (const file of enterProductImg) {
				const storageRef = ref(storage, `productImages/${Date.now() + file.name}`);
				const uploadTask = uploadBytesResumable(storageRef, file);

				uploadTask.on(
					"state_changed",
					() => {},
					() => {
						toast.error("images not uploaded!");
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							imgUrls.push(downloadURL);
							if (imgUrls.length === enterProductImg.length) {
								addDoc(docRef, {
									productName: enterTitle,
									shortDescription: enterShortDescription,
									description: enterDescription,
									category: enterCategory,
									price: Number(enterPrice),
									imgUrls: downloadURL,
								});
								setLoading(false);
								toast.success("product added successfully");
								navigate("/dashboard/all-products");
							}
						});
					}
				);
			}
		} catch (error) {
			setLoading(false);
			toast.error("Product not added");
		}
	};

	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						{loading ? (
							<h4 className="py-5">Ładowanko....</h4>
						) : (
							<>
								<h4 className="mb-4">Add Product</h4>
								<Form onSubmit={addProduct}>
									<FormGroup className="form__group">
										<span>Product title</span>
										<input
											type="text"
											placeholder="Product title...."
											value={enterTitle}
											onChange={(e) => setEnterTitle(e.target.value)}
											required
										/>
									</FormGroup>

									<FormGroup className="form__group">
										<span>Short Description</span>
										<input
											type="text"
											placeholder="Short Description...."
											value={enterShortDescription}
											onChange={(e) => setEnterShortDescription(e.target.value)}
											required
										/>
									</FormGroup>

									<FormGroup className="form__group">
										<span>Description</span>
										<input
											type="text"
											placeholder="Description...."
											value={enterDescription}
											onChange={(e) => setEnterDescription(e.target.value)}
											required
										/>
									</FormGroup>

									<div className="d-flex align-items-center justify-content-between gap-5">
										<FormGroup className="form__group w-50">
											<span>Price</span>
											<input
												type="number"
												placeholder="Price...."
												value={enterPrice}
												onChange={(e) => setEnterPrice(e.target.value)}
												required
											/>
										</FormGroup>

										<FormGroup className="form__group w-50">
											<span>Category</span>
											<select
												className="w-100 p-2"
												value={enterCategory}
												onChange={(e) => setEnterCategory(e.target.value)}
											>
												<option>Select Category</option>
												<option value="chair">Chair</option>
												<option value="sofa">Sofa</option>
												<option value="mobile">Mobile</option>
												<option value="watch">Watch</option>
												<option value="wireless">Wireless</option>
											</select>
										</FormGroup>
									</div>
									<div>
										<FormGroup className="form__group">
											<span>Product image</span>
											<input type="file" multiple onChange={(e) => setEnterProductImg([...e.target.files])} />
										</FormGroup>
									</div>
									<button className="buy__btn btn " type="submit">
										Add product
									</button>
								</Form>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AddProducts;
