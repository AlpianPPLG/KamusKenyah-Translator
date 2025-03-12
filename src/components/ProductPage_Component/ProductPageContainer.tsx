import Hero from "./Hero";
import UseCases from "./UseCases";
import AffiliateAndReferralProgram from "./AffiliateAndReferralProgram";
import YouMayAlsoLike from "./YouMayAlsoLike";
import WhatsNext from "./What’sNext";

const ProductPageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <UseCases />
      <AffiliateAndReferralProgram />
      <YouMayAlsoLike />
      <WhatsNext />
    </div>
  );
};

export default ProductPageContainer;
