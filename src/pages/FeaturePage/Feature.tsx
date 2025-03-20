import FeatureLayout from "../../layouts/FeatureLayout";
import FeaturePageContainer from "../../components/FeaturePage_Component/FeaturePageContainer";

const Feature: React.FC = () => {
  return (
    <FeatureLayout>
      <div>
        <FeaturePageContainer />
      </div>
    </FeatureLayout>
  );
};

export default Feature;
