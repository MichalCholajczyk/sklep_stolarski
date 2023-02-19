import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../../custom-hooks/useGetData";
import { db } from "../../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AllProducts = () => {
	// Wywołanie hooka useGetData i destrukturyzacja zwracanego obiektu
	const { data: productsData, loading } = useGetData("products");

	// Funkcja asynchroniczna do usuwania produktu o danym ID z bazy danych
	const deleteProduct = async (id) => {
		await deleteDoc(doc(db, "products", id));
		// Wyświetlenie powiadomienia o pomyślnym usunięciu produktu
		toast.success("Product Deleted successfully");
	};

	// Renderowanie komponentu
	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						<table className="table">
							<thead>
								<tr>
									<th>Image</th>
									<th>Title</th>
									<th>Category</th>
									<th>Price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									// Wyświetlenie informacji o ładowaniu danych, jeśli loading === true
									<h3 className="py-5 text-center fw-bold">Ładowanko....</h3>
								) : (
									// Mapowanie danych zwróconych przez hook useGetData na elementy tabeli
									productsData.map((item) => (
										<tr key={item.id}>
											<td>
												<img src={item.imgUrl} alt="" />
											</td>
											<td>{item.productName}</td>
											<td>{item.category}</td>
											<td>${item.price}</td>
											<td>
												<button
													onClick={() => {
														// Wywołanie funkcji deleteProduct przy kliknięciu przycisku
														deleteProduct(item.id);
													}}
													className="btn btn-danger"
												>
													Delete
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
export default AllProducts;
