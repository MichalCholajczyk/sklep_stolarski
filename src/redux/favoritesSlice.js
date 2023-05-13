import { createSlice } from '@reduxjs/toolkit';

// początkowy stan
const initialState = {
  favorites: []
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // funkcja dodająca produkt do ulubionych
    addFavorite: (state, action) => {
      // sprawdzanie, czy produkt jest już w ulubionych
      const isFavorite = state.favorites.find(favorite => favorite.id === action.payload.id);
      if (!isFavorite) {
        // jeżeli produkt nie jest w ulubionych, dodajemy go
        state.favorites.push(action.payload);
      } else {
        // jeżeli produkt jest już w ulubionych, nie dodajemy go ponownie
        console.log("Product is already a favorite");
      }
    },
    // funkcja usuwająca produkt z ulubionych
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id);
    },
  },
});

// eksportowanie akcji
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

// eksportowanie stanu
export default favoritesSlice.reducer;
