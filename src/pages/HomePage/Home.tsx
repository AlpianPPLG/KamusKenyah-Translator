import MainLayout from "../../layouts/MainLayout";
import HomePageContainer from "../../components/HomePage_Component/HomePageContainer";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <HomePageContainer />
      </div>
    </MainLayout>
  );
};

export default Home;
