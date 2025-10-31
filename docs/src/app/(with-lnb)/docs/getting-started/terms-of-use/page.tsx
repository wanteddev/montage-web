import CustomRenderProvider from '@/features/docs/components/custom-render/provider';
import CustomRenderSummary from '@/features/docs/components/custom-render/summary';
import TermsOfUse from '@/features/docs/components/getting-started/terms-of-use';
import { createMetadata } from '@/helpers/metadata';

import type { Metadata } from 'next';

const TITLE = 'Terms of use';

export const generateMetadata = (): Metadata =>
  createMetadata({
    title: TITLE,
  });

const TermsOfUsePage = () => {
  return (
    <>
      <CustomRenderSummary title={TITLE} />

      <CustomRenderProvider>
        <TermsOfUse />
      </CustomRenderProvider>
    </>
  );
};

export default TermsOfUsePage;
