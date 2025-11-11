import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import UtilitiesOverview from '@/features/docs/components/utilities/overview';

const UtilitiesOverviewPage = () => {
  return (
    <CustomRenderProvider>
      <UtilitiesOverview platform="ios" />
    </CustomRenderProvider>
  );
};

export default UtilitiesOverviewPage;
