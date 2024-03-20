import { useAppDispatch, useAppSelector } from "../../app/hook";

import { RootState } from "../../app/store";
import { getOneProductExtraReducer } from "../../app/features/product/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// import { useGetOneProductQuery } from "../../app/services/products.service";

const DetailPage = () => {
  const { id } = useParams();

  const {
    productInfor: product,
    isLoading,
    isError,
  } = useAppSelector((state: RootState) => state.product);

  // const {
  //   data: product,
  //   isLoading,
  //   isError,
  // } = useGetOneProductQuery(String(id));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneProductExtraReducer(String(id)));
  }, [dispatch, id]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>No product found</div>;
  if (isError) return <div>Error</div>;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <h2>Id: {product.id}</h2>
      <h2> - Name: {product.name}</h2>
      <h2> - Price: {product.price}</h2>
    </div>
  );
};

export default DetailPage;
