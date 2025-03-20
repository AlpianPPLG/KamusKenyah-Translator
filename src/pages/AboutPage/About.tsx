import AboutLayout from "../../layouts/AboutLayout";
import AboutPageContainer from "../../components/AboutPage_Component/AboutPageContainer";

const About: React.FC = () => {
  return (
    <AboutLayout>
      <div>
        <AboutPageContainer />
      </div>
    </AboutLayout>
  );
};

export default About;
