import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { USERS_URL } from "../utils/constants";

const useUserSummary = () => {
  const dispatch = useDispatch();

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}`+"/", {
        withCredentials: true,
      });
      dispatch(setUserData(data.data));
    } catch (err) {
      dispatch(setUserData(null));
    }
  };
  useEffect(() => {
    fetchSummary();
  }, []);
};

export default useUserSummary;
