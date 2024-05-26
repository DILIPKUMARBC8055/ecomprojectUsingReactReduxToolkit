import { configureStore } from "@reduxjs/toolkit";
import { productReducers } from "./redux/Products/productRedux";
import { authReducers } from "./redux/Auth/authRedux";

export const store = configureStore({
  reducer: {
    productReducers,
    authReducers,
  },
});
