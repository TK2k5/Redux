import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../app/services/products.service";

import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    isError: errorProduct,
    isLoading: loadingProduct,
    data: products,
  } = useGetAllProductsQuery();

  const [handleDeleteProduct, { isLoading }] = useDeleteProductMutation();
  const [handleUpdateProduct] = useUpdateProductMutation();

  if (loadingProduct) return <div>Loading...</div>;
  if (errorProduct) return <div>Error</div>;

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
              {isLoading ? (
                "Loading..."
              ) : (
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete Product
                </button>
              )}
              <Link to={`/detail/${product.id}`}>Get Product By Id</Link>
              <button
                onClick={() =>
                  handleUpdateProduct({
                    id: product.id,
                    name:
                      "Product" + Math.ceil(Math.random() * 100) + " Edited",
                    price: Math.ceil(Math.random() * 100),
                  })
                }
              >
                Edit Product
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
