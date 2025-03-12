import Hero from "./Hero";
import UseCases from "./UseCases";
import AffiliateAndReferralProgram from "./AffiliateAndReferralProgram";
import YouMayAlsoLike from "./YouMayAlsoLike";

const ProductPageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <UseCases />
      <AffiliateAndReferralProgram />
      <YouMayAlsoLike />
    </div>
  );
};

export default ProductPageContainer;
