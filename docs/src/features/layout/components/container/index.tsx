'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import type { HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const Container = ({ children, ...props }: Props) => {
  return (
    <FlexBox
      flexDirection="column"
      flex="1 1 0"
      sx={(theme) => ({
        padding: '0px 20px',
        maxWidth: '100%',
        [respondMore(theme.breakpoint.sm)]: {
          padding: '0px 40px',
          maxWidth: '1480px',
        },
      })}
      {...props}
    >
      {children}
    </FlexBox>
  );
};

export default Container;
