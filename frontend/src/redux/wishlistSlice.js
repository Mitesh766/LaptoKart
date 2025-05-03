import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    wishlistCount: 0,
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
      state.wishlistCount = action.payload.length;
    },
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
  },
});

export const { setWishlistItems, setWishlistCount } = wishlistSlice.actions;

export default wishlistSlice.reducer;


