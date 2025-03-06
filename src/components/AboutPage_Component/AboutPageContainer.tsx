import Hero from "./Hero";
import OurTeam_Carousel from "./OurTeam_Carousel";
import MeetOurCommunity from "./MeetOurCommunity";
import UserSpotlight from "./UserSpotlight";

const AboutPageContainer = () => {
  return (
    <div className="About">
      <Hero />
      <OurTeam_Carousel />
      <MeetOurCommunity />
      <UserSpotlight />
    </div>
  );
};

export default AboutPageContainer;
