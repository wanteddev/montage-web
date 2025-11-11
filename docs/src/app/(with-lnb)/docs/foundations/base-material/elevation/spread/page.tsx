import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import FoundationsElevationSpread from '@/features/docs/components/foundations/elevation/spread';

const ElevationSpreadPage = () => {
  return (
    <CustomRenderProvider>
      <FoundationsElevationSpread />
    </CustomRenderProvider>
  );
};

export default ElevationSpreadPage;
