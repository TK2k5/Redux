import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IProduct } from "./../../../types/product.type";
import axios from "axios";

type ProductState = {
  products: IProduct[];
  productInfor: IProduct | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: ProductState = {
  products: [],
  productInfor: null,
  isLoading: false,
  isError: false,
};

// Create function thunk
// Lấy ra sản phẩm
const url = "http://localhost:3000";
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await axios.get(`${url}/products`);
    return response.data;
  }
);

// Delete Product
export const deleteProductExtraReducer = createAsyncThunk(
  "product/deleteProductExtraReducer",
  async (id: number) => {
    await axios.delete(`${url}/products/${id}`);
    return id;
  }
);

// Tạo ra sản phẩm
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product: Omit<IProduct, "id">) => {
    const response = await axios.post(`${url}/products`, product);
    return response.data;
  }
);

// edit product
export const editProductExtraReducer = createAsyncThunk(
  "product/editProductExtraReducer",
  async (product: IProduct) => {
    const response = await axios.put(`${url}/products/${product.id}`, product);
    return response.data;
  }
);

// Get one product
export const getOneProductExtraReducer = createAsyncThunk(
  "product/getOneProductExtraReducer",
  async (id: number | string) => {
    const response = await axios.get(`${url}/products/${id}`);
    return response.data;
  }
);

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
  extraReducers: (builder) => {
    // Get all products
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // delete product
    builder.addCase(deleteProductExtraReducer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductExtraReducer.fulfilled, (state, action) => {
      const id = action.payload;
      const newProduct = state.products.filter((product) => product.id !== id);
      state.products = newProduct;
      state.isLoading = false;
    });
    builder.addCase(deleteProductExtraReducer.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // edit product
    builder.addCase(editProductExtraReducer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProductExtraReducer.fulfilled, (state, action) => {
      const newProduct = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      state.products = newProduct;
      state.isLoading = false;
    });
    builder.addCase(editProductExtraReducer.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // get one product
    builder.addCase(getOneProductExtraReducer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneProductExtraReducer.fulfilled, (state, action) => {
      state.productInfor = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getOneProductExtraReducer.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { addProduct, deleteProduct, editProduct, getProductById } =
  productSilce.actions;

const productReducers = productSilce.reducer;
export default productReducers;
