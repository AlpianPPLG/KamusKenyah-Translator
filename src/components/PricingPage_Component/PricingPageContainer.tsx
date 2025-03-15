import Hero from "./Hero";
import SecurePaymentAndTrustedPartners from "./SecurePaymentAndTrustedPartners";
import EnterpriseCustomPlan from "./EnterpriseCustomPlan";
import MoneyBackGuaranteeAndRefundPolicy from "./MoneyBackGuaranteeAndRefundPolicy";
import WhyChooseOurPricingPlans from "./WhyChooseOurPricingPlans";
import ContactCustomerService from "./ContactCustomerService";
import FAQ from "./FAQ";

const PricingPageContainer = () => {
  return (
    <div className="Pricing">
      <Hero />
      <SecurePaymentAndTrustedPartners />
      <EnterpriseCustomPlan />
      <MoneyBackGuaranteeAndRefundPolicy />
      <WhyChooseOurPricingPlans />
      <ContactCustomerService />
      <FAQ />
    </div>
  );
};

export default PricingPageContainer;
