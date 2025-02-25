import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import ContactUs from "../Global_Component/ContactUs";
import FooterSection from "../Global_Component/Footer";

const HomePageContainer = () => {
  return (
    <div className="Home">
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <FooterSection />
    </div>
  );
};

export default HomePageContainer;
