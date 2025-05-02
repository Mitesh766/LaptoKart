import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { USERS_URL } from "../utils/constants";
import { setCartCount } from "../redux/cartSlice";
import { setWishlistCount } from "../redux/wishlistSlice";

import { useSelector } from "react-redux";

const useUserSummary = () => {
  const dispatch = useDispatch();
  const summaryFetched = useSelector((state) => state.user.summaryFetched);

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}/`, {
        withCredentials: true,
      });
      console.log(data);
      dispatch(setUserData(data.data.userData));
      dispatch(setCartCount(data.data.cartCount));
      dispatch(setWishlistCount(data.data.wishlistCount));
    } catch (err) {
      dispatch(setUserData(null));
    }
  };

  useEffect(() => {
    if (!summaryFetched) {
      fetchSummary();
    }
  }, [summaryFetched]);
};

export default useUserSummary;
