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
    },
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
  },
});

export const {setWishlistItems,setWishlistCount}= wishlistSlice.actions

export default wishlistSlice.reducer


export const isProductInWishlist = (wishlistItems, productId) => {
  return wishlistItems.some(
    (item) => item.productId._id.toString() === productId.toString()
  );
};
