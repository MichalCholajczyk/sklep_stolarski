// Importowanie potrzebnych modułów z React i Firebase
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

// Definicja funkcji useAuth
const useAuth = () => {
	// Ustawienie początkowego stanu dla aktualnie zalogowanego użytkownika
	const [currentUser, setCurrentUser] = useState({});

	// Wywołanie funkcji useEffect w celu obserwowania zmian w stanie zalogowania użytkownika
	useEffect(() => {
		// Wywołanie funkcji onAuthStateChanged z modułu Firebase
		onAuthStateChanged(auth, (user) => {
			// Jeśli użytkownik jest zalogowany, ustawienie aktualnego użytkownika na użytkownika zalogowanego
			if (user) {
				setCurrentUser(user);
			}
			// W przeciwnym przypadku ustawienie aktualnego użytkownika na null
			else {
				setCurrentUser(null);
			}
		});
	});

	// Zwrócenie aktualnego użytkownika
	return {
		currentUser,
	};
};

export default useAuth;
