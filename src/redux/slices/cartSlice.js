//import biblioteki reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

//ustawienie początkowego stanu koszyka
const initialState = {
	cartItems: [],
	totalAmount: 0,
	totalQuantity: 0,
};

//utworzenie reducera koszyka z wykorzystaniem createSlice z biblioteki reduxjs/toolkit
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		//dodanie produktu do koszyka
		addItem: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.cartItems.find((item) => item.id === newItem.id);
			state.totalQuantity++;

			if (!existingItem) {
				state.cartItems.push({
					id: newItem.id,
					productName: newItem.productName,
					imgUrl: newItem.imgUrl,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price);
			}

			state.totalAmount = state.cartItems.reduce(
				(total, item) => total + Number(item.price) * Number(item.quantity),
				0
			);

			//komentarz do celów diagnostycznych
			// console.log(state.totalQuantity);
			// console.log(state.cartItems)
			// console.log(newItem)
		},

		//usunięcie produktu z koszyka
		deleteItem: (state, action) => {
			const id = action.payload;
			const existingItem = state.cartItems.find((item) => item.id === id);

			if (existingItem) {
				state.cartItems = state.cartItems.filter((item) => item.id !== id);
				state.totalQuantity = state.totalQuantity - existingItem.quantity;
			}

			state.totalAmount = state.cartItems.reduce(
				(total, item) => total + Number(item.price) * Number(item.quantity),
				0
			);
		},
	},
});

//wyeksportowanie akcji z reducera koszyka
export const cartActions = cartSlice.actions;

//wyeksportowanie samego reducera koszyka
export default cartSlice.reducer;
