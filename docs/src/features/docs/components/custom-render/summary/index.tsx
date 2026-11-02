import { FlexBox } from '@montage-ui/core';

import DocsThumbnail from '../../thumbnail';
import DocsTitle from '../../title';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  description?: string;
  thumbnail?: string;
}>;

const CustomRenderSummary = ({
  title,
  description,
  thumbnail,
  children,
}: Props) => {
  return (
    <>
      <FlexBox flexDirection="column" sx={{ marginBottom: '24px' }}>
        <DocsTitle title={title} description={description} />
      </FlexBox>

      <DocsThumbnail src={thumbnail} alt={title} aria-hidden />

      {children}
    </>
  );
};

export default CustomRenderSummary;
