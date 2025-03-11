import MainLayout from "../../layouts/MainLayout";
import ProductPageContainer from "../../components/ProductPage_Component/ProductPageContainer";

const Product: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <ProductPageContainer />
      </div>
    </MainLayout>
  );
};

export default Product;
