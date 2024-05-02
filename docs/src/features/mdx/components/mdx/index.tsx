import { MDXRemote } from 'next-mdx-remote';
import { FlexBox } from '@wanteddev/wds';
import { type ComponentProps } from 'react';

import MDXComponents from '../../constants';

import { mdxRootStyle } from './style';

const MDX = (props: Omit<ComponentProps<typeof MDXRemote>, 'components'>) => {
  return (
    <FlexBox flexDirection="column" sx={mdxRootStyle}>
      <MDXRemote components={MDXComponents} {...props} />
    </FlexBox>
  );
};

export default MDX;
