import { ScrollArea } from '@wanteddev/wds';

import { preStyle, preWrapperStyle } from './style';

import type { ComponentProps } from 'react';

type Props = ComponentProps<'pre'>;

const Pre = (props: Props) => {
  return (
    <ScrollArea css={preWrapperStyle}>
      <pre css={preStyle} {...props} />
    </ScrollArea>
  );
};

export default Pre;
