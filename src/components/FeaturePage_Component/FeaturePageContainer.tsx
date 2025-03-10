import Hero from "./Hero";
import FeaturesList from "./FeaturesList";
import FeatureComparison from "./FeatureComparison";
import StatisticsAndAchievements from "./StatisticsAndAchievements";
import SecurityPrivacyAssurance from "./SecurityPrivacyAssurance";

const FeaturePageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <FeaturesList />
      <FeatureComparison />
      <StatisticsAndAchievements />
      <SecurityPrivacyAssurance />
    </div>
  );
};

export default FeaturePageContainer;
