import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import FoundationsColorsSemantic from '@/features/docs/components/foundations/colors/semantic';

const ColorsSemanticPage = () => {
  return (
    <CustomRenderProvider>
      <FoundationsColorsSemantic />
    </CustomRenderProvider>
  );
};

export default ColorsSemanticPage;
