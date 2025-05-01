import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserData: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
