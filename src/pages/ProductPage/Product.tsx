import ProductLayout from "../../layouts/ProductLayout";
import ProductPageContainer from "../../components/ProductPage_Component/ProductPageContainer";

const Product: React.FC = () => {
  return (
    <ProductLayout>
      <div>
        <ProductPageContainer />
      </div>
    </ProductLayout>
  );
};

export default Product;
