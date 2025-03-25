import LearnMoreLayout from "../../../layouts/LearnMoreLayout";
import Hero from "./Hero";
import CustomerJourneyMap from "./CustomerJourneyMap";
import WhatIf from "./WhatIf";
import SecretTips from "./SecretTips";
import SecretDeveloperEasterEgg from "./SecretDeveloperEasterEgg";
import CommonMistakes from "./CommonMistake";
import FAQ from "./FAQ";

const LearnMorePageContainer = () => {
  return (
    <LearnMoreLayout>
      <Hero />
      <CustomerJourneyMap />
      <WhatIf />
      <SecretTips />
      <SecretDeveloperEasterEgg />
      <CommonMistakes />
      <FAQ />
    </LearnMoreLayout>
  );
};

export default LearnMorePageContainer;
