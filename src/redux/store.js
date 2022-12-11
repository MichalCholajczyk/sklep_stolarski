import { configureStore } from "@reduxjs/toolkit";

import cartSlice  from "./slices/cartSlice";


const stroe = configureStore({
  reducer:{
    cart: cartSlice,
  }
});

export default stroe;