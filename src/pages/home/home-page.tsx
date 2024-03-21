import {
  deleteProductExtraReducer,
  editProductExtraReducer,
  getAllProducts,
} from "../../app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";

import { Link } from "react-router-dom";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, isError, isLoading } = useAppSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <div className="">
        {products && products.length === 0 && <h2>No products found</h2>}
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <h2>Id: {product.id}</h2>
              <h2> - Name: {product.name}</h2>
              <h2> - Price: {product.price}</h2>

              <button
                onClick={() => dispatch(deleteProductExtraReducer(product.id))}
              >
                Delete Product
              </button>

              <Link to={`/detail/${product.id}`}>Get Product By Id</Link>
              <button
                onClick={() =>
                  dispatch(
                    editProductExtraReducer({
                      id: product.id,
                      name:
                        "Product " +
                        Math.ceil(Math.random() * 100) +
                        " Updated",
                      price: Math.ceil(Math.random() * 100),
                    })
                  )
                }
              >
                Edit Product
              </button>
              <button onClick={() => dispatch(addToCart(product.id))}>
                Add to cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
