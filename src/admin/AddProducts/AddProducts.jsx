// AddProducts.jsx

import React, { useState, useCallback } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DraggableImage = ({ id, file, moveImage }) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: "image",
		item: { id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const [, drop] = useDrop(() => ({
		accept: "image",
		hover(item) {
			if (item.id !== id) {
				moveImage(item.id, id);
			}
		},
	}));

	const url = URL.createObjectURL(file);

	return (
		<div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<img src={url} alt="" style={{ width: "100px", height: "100px" }} />
		</div>
	);
};
const AddProducts = () => {
	const [images, setImages] = useState([]);

	const moveImage = useCallback((fromId, toId) => {
		setImages((prevImages) => {
			const fromIndex = prevImages.findIndex((img) => img.id === fromId);
			const toIndex = prevImages.findIndex((img) => img.id === toId);
			const newImages = [...prevImages];

			const temp = newImages[fromIndex];
			newImages[fromIndex] = newImages[toIndex];
			newImages[toIndex] = temp;

			return newImages;
		});
	}, []);

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

			let imgUrls = [];
			for (const [index, image] of images.entries()) {
				const storageRef = ref(storage, `productImages/${Date.now() + index}`);
				const uploadTask = uploadBytesResumable(storageRef, image.file);

				uploadTask.on(
					"state_changed",
					() => { },
					(error) => {
						toast.error("Image not uploaded! " + error.message);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							imgUrls.push(downloadURL);
							if (imgUrls.length === images.length) {
								addDoc(docRef, {
									productName: enterTitle,
									shortDescription: enterShortDescription,
									description: enterDescription,
									category: enterCategory,
									price: Number(enterPrice),
									imgUrls: imgUrls,
								});
								setLoading(false);
								toast.success("Product added successfully");
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
								<DndProvider backend={HTML5Backend}>
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
												<input
													type="file"
													multiple
													onChange={(e) =>
														setImages([...e.target.files].map((file, index) => ({ id: index.toString(), file })))
													}
												/>
											</FormGroup>
										</div>
										//! przeciąganie zdjęć nie działa 
										<div className="d-flex align-items-center  gap-5">
											{images.map((img, index) => (
												<DraggableImage key={index} id={index} file={img.file} moveImage={moveImage} />
											))}
										</div>
										<button className="buy__btn btn " type="submit">
											Add product
										</button>
									</Form>
								</DndProvider>
							</>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AddProducts;
