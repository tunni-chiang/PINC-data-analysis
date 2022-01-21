import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice";
import pincDataReducer from "../store/slices/dataSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pinc_data: pincDataReducer,
  },
});
