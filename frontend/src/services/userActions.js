// src/services/userActions.js
import axios from "axios";
import { toast } from "react-toastify";
import { setCartItems, setTotalCartAmount } from "../redux/cartSlice";
import { setWishlistItems } from "../redux/wishlistSlice";
import { CART_URL, WISHLIST_URL } from "../utils/constants";

export const addToCart = async (productId, dispatch, navigate) => {
  try {
    const { data } = await axios.post(
      `${CART_URL}/${productId}`,
      {},
      { withCredentials: true }
    );
    dispatch(setCartItems(data.data.cart));
    dispatch(setTotalCartAmount(data.data.totalCartValue));
    toast.success("Added to cart");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to add to cart");
    if (err?.response?.status === 401) navigate("/login");
  }
};

export const removeFromCart = async (productId, dispatch, navigate) => {
  try {
    const { data } = await axios.delete(`${CART_URL}/${productId}`, {
      withCredentials: true,
    });
    dispatch(setCartItems(data.data.cart));
    dispatch(setTotalCartAmount(data.data.totalCartValue));
    toast.success("Removed from cart");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to remove from cart");
    if (err?.response?.status === 401) navigate("/login");
  }
};

export const addToWishlist = async (productId, dispatch, navigate) => {
  try {
    const { data } = await axios.post(
      `${WISHLIST_URL}/${productId}`,
      {},
      { withCredentials: true }
    );
    dispatch(setWishlistItems(data?.wishlistData?.wishlist));
    toast.success("Added to wishlist");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to add to wishlist");
    if (err?.response?.status === 401) navigate("/login");
  }
};

export const removeFromWishlist = async (productId, dispatch, navigate) => {
  try {
    const { data } = await axios.delete(`${WISHLIST_URL}/${productId}`, {
      withCredentials: true,
    });
    dispatch(setWishlistItems(data?.wishlistData?.wishlist));
    toast.success("Removed from wishlist");
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to remove from wishlist"
    );
    if (err?.response?.status === 401) navigate("/login");
  }
};

export const handleCartQty = async (
  productId,
  quantity,
  dispatch,
  navigate
) => {
  try {
    if (quantity < 1) return;
    if (quantity > 2) {
      throw new Error("Max allowed quantity is 2");
    }
    const { data } = await axios.put(
      `${CART_URL}/${productId}`,
      { quantity },
      {
        withCredentials: true,
      }
    );
    dispatch(setCartItems(data.data.cart));
    dispatch(setTotalCartAmount(data.data.totalCartValue));
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        err?.message ||
        "Failed to update cart quantity"
    );
    if (err?.response?.status === 401) navigate("/login");
  }
};
