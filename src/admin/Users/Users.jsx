// Importy zewnętrzne
import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../../custom-hooks/useGetData";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
// Komponent Users
const Users = () => {
	// Użycie niestandardowego hooka useGetData do pobrania danych użytkowników
	const { data: usersData, loading } = useGetData("users");

	// Funkcja usuwająca użytkownika z bazy danych Firebase
	const deleteUser = async (id) => {
		await deleteDoc(doc(db, "users", id)); // Usunięcie dokumentu o podanym id z kolekcji "users"
		toast.success("Account deleted");
	};

	return (
		<section>
			<Container>
				<Row>
					<Col lg="12">
						<h4 className="fw-bold">Users</h4>
						{/* Nagłówek sekcji "Users" */}
					</Col>
					<Col lg="12" className="pt-5">
						<table className="table">
							<thead>
								<tr>
									<th>Image</th>
									<th>Username</th>
									<th>Email</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{/* Warunek sprawdzający, czy dane są ładowane */}
								{loading ? (
									// Wyświetlenie komunikatu o ładowaniu danych
									<h5 className="pt-5 fw-bold">Ładowanko....</h5>
								) : (
									// Mapowanie danych użytkowników na wiersze tabeli
									usersData?.map((user) => (
										<tr key={user.uid}>
											<td>
												<img src={user.photoURL} alt="" />
												{/* Wyświetlenie zdjęcia użytkownika */}
											</td>
											<td>{user.displayName}</td>
											{/* Wyświetlenie nazwy użytkownika */}
											<td>{user.email}</td>
											{/* Wyświetlenie adresu email użytkownika */}
											<td>
												<button
													className="btn btn-danger"
													onClick={() => {
														// Wywołanie funkcji usuwającej użytkownika po kliknięciu przycisku
														deleteUser(user.uid);
													}}
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

export default Users;
