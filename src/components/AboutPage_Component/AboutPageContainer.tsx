import Hero from "./Hero";
import OurMissionAndVision from "./OurMissionAndVission";
import OurTeam_Carousel from "./OurTeam_Carousel";
import MeetOurCommunity from "./MeetOurCommunity";
import UserSpotlight from "./UserSpotlight";
import FunFacts from "./FunFacts";
import FAQSection from "./FAQ";

const AboutPageContainer = () => {
  return (
    <div className="About">
      <Hero />
      <OurMissionAndVision />
      <OurTeam_Carousel />
      <MeetOurCommunity />
      <UserSpotlight />
      <FunFacts />
      <FAQSection />
    </div>
  );
};

export default AboutPageContainer;
