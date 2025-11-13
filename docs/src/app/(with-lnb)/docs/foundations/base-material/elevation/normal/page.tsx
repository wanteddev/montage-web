import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import FoundationsElevationNormal from '@/features/docs/components/foundations/elevation/normal';

const ElevationNormalPage = () => {
  return (
    <CustomRenderProvider>
      <FoundationsElevationNormal />
    </CustomRenderProvider>
  );
};

export default ElevationNormalPage;
