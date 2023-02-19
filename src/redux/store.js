// Importujemy funkcję configureStore z biblioteki @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importujemy nasz slice z koszykiem z pliku cartSlice.js
import cartSlice from "./slices/cartSlice";

// Konfigurujemy nasze store przy pomocy funkcji configureStore z naszym reducerem
const store = configureStore({
	reducer: {
		cart: cartSlice,
	},
});

// Eksportujemy nasz store
export default store;
