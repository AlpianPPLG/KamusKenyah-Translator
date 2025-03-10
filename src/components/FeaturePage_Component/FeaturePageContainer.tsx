import Hero from "./Hero";
import FeaturesList from "./FeaturesList";
import FeatureComparison from "./FeatureComparison";
import StatisticsAndAchievements from "./StatisticsAndAchievements";
import SecurityPrivacyAssurance from "./SecurityPrivacyAssurance";
import MultiPlatformCompatibility from "./MultiPlatformCompatibility";
import FeatureRequestAndFeedback from "./FeatureRequestAndFeedback";

const FeaturePageContainer = () => {
  return (
    <div className="Feature">
      <Hero />
      <FeaturesList />
      <FeatureComparison />
      <StatisticsAndAchievements />
      <SecurityPrivacyAssurance />
      <MultiPlatformCompatibility />
      <FeatureRequestAndFeedback />
    </div>
  );
};

export default FeaturePageContainer;
