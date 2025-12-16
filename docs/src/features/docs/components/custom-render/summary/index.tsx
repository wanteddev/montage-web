import { FlexBox } from '@wanteddev/wds';

import DocsTitle from '../../title';
import DocsThumbnail from '../../thumbnail';

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
