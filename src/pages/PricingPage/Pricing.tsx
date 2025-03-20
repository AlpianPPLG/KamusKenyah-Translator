import PricingLayout from "../../layouts/PricingLayout";
import PricingPageContainer from "../../components/PricingPage_Component/PricingPageContainer";

const Pricing: React.FC = () => {
  return (
    <PricingLayout>
      <div>
        <PricingPageContainer />
      </div>
    </PricingLayout>
  );
};

export default Pricing;
