import MainLayout from "../../layouts/MainLayout";
import AboutPageContainer from "../../components/AboutPage_Component/AboutPageContainer";

const About: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <AboutPageContainer />
      </div>
    </MainLayout>
  );
};

export default About;
