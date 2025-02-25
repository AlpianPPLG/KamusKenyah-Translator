import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/HomePage_Component/Hero";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <Hero />
      </div>
    </MainLayout>
  );
};

export default Home;
