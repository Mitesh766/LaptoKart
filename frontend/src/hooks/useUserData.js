import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { USERS_URL } from "../utils/constants.js";
import { setCartItems } from "../redux/cartSlice.js";

import {setWishlistItems} from"../redux/wishlistSlice.js"


const useUserData = () => {
  const dispatch = useDispatch();
  const isUserFetched = useSelector((state) => state.user.isUserFetched);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}/`, {
        withCredentials: true,
      });
      console.log(data)


   
      
      

      dispatch(setUserData(data.data.userData));
      dispatch(setWishlistItems(data.data.wishlistData.wishlist))
      dispatch(setCartItems(data.data.cartData.cart))
    
    } catch (err) {
      console.warn("User not logged in or fetch failed." + err);
      dispatch(setUserData(null));
    }
  };

  useEffect(() => {
    if (!isUserFetched) {
      fetchUserData();
    }
  }, [isUserFetched, dispatch]);
};

export default useUserData;
