import MainLayout from "../../layouts/MainLayout";
import ErrorPage from '../../components/ErrorPage_Component/ErrorPage';

const Error: React.FC = () => {
    return (
      <MainLayout>
        <div>
          <ErrorPage />
        </div>
      </MainLayout>
    );
  };

export default Error;