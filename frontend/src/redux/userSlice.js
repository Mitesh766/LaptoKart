import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  summaryFetched: false,  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userInfo = action.payload;
      state.summaryFetched = !!action.payload;  
    },
    clearUserData: (state) => {
      state.userInfo = null;
      state.summaryFetched = false;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
