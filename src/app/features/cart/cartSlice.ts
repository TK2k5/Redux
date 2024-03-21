import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart } from "../../../types/cart.type";
import axios from "axios";

type CartState = {
  cartItems: ICart[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  isLoading: boolean;
  isError: boolean;
};

const initialState: CartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  isLoading: false,
  isError: false,
};

const url = "http://localhost:3000";

export const addToCart = createAsyncThunk(
  "product/addToCart",
  async (id: number | string) => {
    const response = await axios.get(`${url}/products/${id}`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        state.isLoading = false;
      }
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

const cartReducers = cartSlice.reducer;
export default cartReducers;
