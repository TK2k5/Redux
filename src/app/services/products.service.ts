import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IProduct } from "../../types/product.type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Lấy tất cả sản phẩm và lấy ra 1 sản phẩm => query
    getAllProducts: builder.query<IProduct[], void>({
      query: () => `/products`,
      providesTags: (result) =>
        // Nếu result có dữ liệu thì trả về mảng các id của các product và id của LIST
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Product", id } as const)),
              { type: "Product", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Product', id: 'LIST' }` is invalidated
            [{ type: "Product", id: "LIST" }],
    }),
    // Thêm sản phẩm, cập nhật, delete => mutation
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation<IProduct, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    getOneProduct: builder.query<IProduct, number | string>({
      query: (id: number | string) => `/products/${id}`,
    }),
  }),
});

// Nếu chúng ta lấy sản phẩm thì sẽ là useGetAllProductQuery
// Nếu chúng ta thêm sản phẩm thì sẽ là useAddProductMutation
export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetOneProductQuery,
} = productApi;
