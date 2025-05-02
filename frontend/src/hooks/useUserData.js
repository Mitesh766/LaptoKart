import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { USERS_URL } from "../utils/constants";
import { setCartCount } from "../redux/cartSlice";
import { setWishlistCount } from "../redux/wishlistSlice";

const useUserData = () => {
  const dispatch = useDispatch();
  const isUserFetched = useSelector((state) => state.user.isUserFetched);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}/`, {
        withCredentials: true,
      });

      console.log(data);

      const userData = data.data.userData;
      const cartCount = data.data.cartCount;
      const wishlistCount = data.data.wishlistCount;

      dispatch(setUserData(userData));
      dispatch(setCartCount(cartCount));
      dispatch(setWishlistCount(wishlistCount));
    } catch (err) {
      console.warn("User not logged in or fetch failed.");
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
