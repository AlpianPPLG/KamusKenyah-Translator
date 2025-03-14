import Hero from "./Hero";
import SecurePaymentAndTrustedPartners from "./SecurePaymentAndTrustedPartners";
import EnterpriseCustomPlan from "./EnterpriseCustomPlan";
import MoneyBackGuaranteeAndRefundPolicy from "./MoneyBackGuaranteeAndRefundPolicy";

const PricingPageContainer = () => {
  return (
    <div className="Pricing">
      <Hero />
      <SecurePaymentAndTrustedPartners />
      <EnterpriseCustomPlan />
      <MoneyBackGuaranteeAndRefundPolicy />
    </div>
  );
};

export default PricingPageContainer;
