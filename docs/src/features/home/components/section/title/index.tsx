import { Box, type SxProp } from '@wanteddev/wds';

import { titleStyle } from './style';

import type { HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  sx?: SxProp;
}> &
  HTMLAttributes<HTMLHeadingElement>;

const SectionTitle = ({ children, sx, ...props }: Props) => {
  return (
    <Box as="h2" sx={[titleStyle, sx]} {...props}>
      {children}
    </Box>
  );
};

export default SectionTitle;
