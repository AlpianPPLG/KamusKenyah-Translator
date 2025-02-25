import MainLayout from "../../layouts/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to My App!</h1>
        <p className="text-lg text-gray-600">
          This is the home page of my app. Feel free to explore!
        </p>
      </div>
    </MainLayout>
  );
};

export default Home;
