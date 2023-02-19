// Import biblioteki React i niezbędnych funkcjonalności
import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = (collectionName) => {
	// Definicja stanu przechowującego pobrane dane i stanu ładowania
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	// Utworzenie referencji do kolekcji w bazie danych Firebase
	const collectionRef = collection(db, collectionName);

	// Efekt pobierający dane z bazy danych Firebase w czasie rzeczywistym
	useEffect(() => {
		const getData = async () => {
			await onSnapshot(collectionRef, (snapshot) => {
				// Ustawienie stanu przechowującego pobrane dane
				setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setLoading(false);
			});
		};

		// Wywołanie funkcji pobierającej dane
		getData();
	}, []);

	// Zwrócenie danych i stanu ładowania
	return { data, loading };
};

export default useGetData;
