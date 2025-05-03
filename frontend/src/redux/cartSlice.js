import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartCount: 0,
    totalCartValue: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.cartCount = action.payload.length;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setTotalCartAmount: (state, action) => {
      state.totalCartValue = action.payload;
    },
  },
});

export const { setCartItems, setCartCount, setTotalCartAmount } =
  cartSlice.actions;

export default cartSlice.reducer;

export const isProductInCart = (cartItems, productId) => {
  return cartItems.some(
    (item) => item.productId._id.toString() === productId.toString()
  );
};
