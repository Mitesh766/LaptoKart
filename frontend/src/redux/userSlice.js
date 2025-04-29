import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setCredentials: (state, action) => action.payload
  },
});

export const { setCredentials } = userSlice.actions;

export default userSlice.reducer;
