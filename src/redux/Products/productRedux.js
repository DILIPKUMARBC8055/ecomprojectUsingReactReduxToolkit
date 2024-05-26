import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  filteredProducts: [],
  cartProducts: [],
  error: "",
};

// Function to filter and search products

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    SET_PRODUCTS: (state, action) => {    
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload;
      
    },
    SET_ERROR: (state, action) => {
      
      state.error = action.payload;
      state.loading = false;
    },
    TOGGLE_LOADING: (state) => {
      state.loading = !state.loading;
    },
    SET_FILTERED_PRODUCTS: (state, action) => {
      state.filteredProducts = action.payload;
    },
    SET_CART_PRODUCTS: (state, action) => { 
      state.cartProducts = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export const productReducers = productSlice.reducer;
export const productSelectors = (state) => state.productReducers;
