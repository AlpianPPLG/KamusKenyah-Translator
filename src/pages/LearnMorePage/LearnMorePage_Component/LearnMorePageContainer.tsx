import LearnMoreLayout from "../../../layouts/LearnMoreLayout";
import Hero from "./Hero";
import CustomerJourneyMap from "./CustomerJourneyMap";
import WhatIf from "./WhatIf";
import SecretTips from "./SecretTips";
import SecretDeveloperEasterEgg from "./SecretDeveloperEasterEgg";

const LearnMorePageContainer = () => {
  return (
    <LearnMoreLayout>
      <Hero />
      <CustomerJourneyMap />
      <WhatIf />
      <SecretTips />
      <SecretDeveloperEasterEgg />
    </LearnMoreLayout>
  );
};

export default LearnMorePageContainer;
