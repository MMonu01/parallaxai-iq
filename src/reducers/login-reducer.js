import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  datalist: { name: "", email: "", profile_image: "", logged_in_success: false },
};

export const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    GET_USER_DETAILS: (state, action) => {
      state.datalist = { ...state.datalist, ...action.payload };
      return state;
    },
    LOGOUT: (state) => {
      return initialState;
    },
  },
});

export const { GET_USER_DETAILS, LOGOUT } = LoginSlice.actions;

export default LoginSlice.reducer;
