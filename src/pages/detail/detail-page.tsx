import { useGetOneProductQuery } from "../../app/services/products.service";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetOneProductQuery(String(id));

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
