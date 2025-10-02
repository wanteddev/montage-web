'use client';
import { FlexBox, respondMore } from '@wanteddev/wds';

import type { HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const Container = ({ children, ...props }: Props) => {
  return (
    <FlexBox
      flexDirection="column"
      flex="1 1 0"
      gap="120px"
      sx={(theme) => ({
        padding: '56px 20px 0px',
        maxWidth: '100%',
        [respondMore(theme.breakpoint.sm)]: {
          padding: '56px 40px 0px',
          maxWidth: '840px',
        },
        [respondMore(theme.breakpoint.xl)]: {
          padding: '56px 40px 0px',
          maxWidth: '1056px',
        },
      })}
      {...props}
    >
      {children}
    </FlexBox>
  );
};

export default Container;
