import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FeaturesHighlight from "./FeaturesHighlight";
import FAQ from "./FAQ";

const HomePageContainer = () => {
  return (
    <div className="Home">
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FeaturesHighlight />
      <FAQ />
    </div>
  );
};

export default HomePageContainer;
