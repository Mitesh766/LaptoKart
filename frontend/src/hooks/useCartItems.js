import axios from "axios";
import { CART_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartCount,
  setCartItems,
  setTotalCartAmount,
} from "../redux/cartSlice";
import { useEffect } from "react";

const useCartItems = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((store) => store.cart.cartItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const resp = await axios.get(`${CART_URL}/`, {
          withCredentials: true,
        });


        console.log(resp)
        dispatch(setCartItems(resp.data.cart));
        dispatch(setTotalCartAmount(resp.data.totalCartValue));
        dispatch(setCartCount(resp.data.cart.length));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (cartData.length === 0) {
      if(!cartData){

        fetchCartItems();
      }
    }
  }, [cartData, dispatch]);
};

export default useCartItems;
