import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import FoundationsColorsAtomic from '@/features/docs/components/foundations/colors/atomic';

const ColorsAtomicPage = () => {
  return (
    <CustomRenderProvider>
      <FoundationsColorsAtomic />
    </CustomRenderProvider>
  );
};

export default ColorsAtomicPage;
