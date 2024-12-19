import { useEffect } from "react";
import CardComponent from "../components/CardComponent";

// service
import ProductService from "../service/ProductService";
// redux
import { useDispatch, useSelector } from "react-redux";
import saveAllProductsAction from "../store/productSlice";

function HomePage() {
  const { allProducts, isLoading } = useSelector((state) => state.productStore);
  const dispatch = useDispatch();

  useEffect(() => {
    ProductService.getAllProductsService()
      .then((res) => {
        dispatch(saveAllProductsAction(res.data.products));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>
          {allProducts.map((product) => {
            return <CardComponent key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HomePage;
