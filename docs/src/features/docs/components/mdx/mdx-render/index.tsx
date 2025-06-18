'use client';
import { MDXRemote } from 'next-mdx-remote';
import { FlexBox } from '@wanteddev/wds';

import { MDX_COMPONENTS } from './constants';
import { mdxRootStyle } from './style';

import type { ComponentProps } from 'react';

const MDXRender = (
  props: Omit<ComponentProps<typeof MDXRemote>, 'components'>,
) => {
  return (
    <FlexBox flexDirection="column" sx={mdxRootStyle}>
      <MDXRemote components={MDX_COMPONENTS} {...props} />
    </FlexBox>
  );
};

export default MDXRender;
