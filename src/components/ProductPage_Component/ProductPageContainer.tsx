import Hero from "./Hero";
import UseCases from "./UseCases";
import AffiliateAndReferralProgram from "./AffiliateAndReferralProgram";
import YouMayAlsoLike from "./YouMayAlsoLike";
import WhatsNext from "./What’sNext";
import Blog from "./Blog";
import RecentUpdates from "./RecentUpdates";

const ProductPageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <UseCases />
      <AffiliateAndReferralProgram />
      <YouMayAlsoLike />
      <WhatsNext />
      <Blog />
      <RecentUpdates />
    </div>
  );
};

export default ProductPageContainer;
