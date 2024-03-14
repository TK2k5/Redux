import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "./../../../types/product.type";

type ProductState = {
  products: IProduct[];
  productInfor: IProduct | null;
};

const initialState: ProductState = {
  products: [],
  productInfor: null,
};

const productSilce = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const newProduct = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = newProduct;
    },
    editProduct: (state, action: PayloadAction<IProduct>) => {
      const newProduct = state.products.find(
        (productItem) => productItem.id === action.payload.id
      );
      if (newProduct) {
        newProduct.name = action.payload.name;
        newProduct.price = action.payload.price;
      }
    },
    getProductById: (state, action: PayloadAction<IProduct>) => {
      const newProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      state.productInfor = newProduct ? newProduct : null;
    },
  },
});

export const { addProduct, deleteProduct, editProduct, getProductById } =
  productSilce.actions;

const productReducers = productSilce.reducer;
export default productReducers;
