import ErrorLayout from "../../layouts/ErrorLayout";
import ErrorPage from "../../components/ErrorPage_Component/ErrorPage";

const Error: React.FC = () => {
  return (
    <ErrorLayout>
      <div>
        <ErrorPage />
      </div>
    </ErrorLayout>
  );
};

export default Error;
