import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isUserFetched: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userInfo = action.payload;
      state.isUserFetched = true;
      
    },
    clearUserData: (state) => {
      state.userInfo = null;
      state.isUserFetched = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
