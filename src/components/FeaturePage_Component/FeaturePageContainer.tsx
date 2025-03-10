import Hero from "./Hero";
import FeaturesList from "./FeaturesList";
import FeatureComparison from "./FeatureComparison";

const FeaturePageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <FeaturesList />
      <FeatureComparison />
    </div>
  );
};

export default FeaturePageContainer;
