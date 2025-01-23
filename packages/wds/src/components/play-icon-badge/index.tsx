'use client';
import { forwardRef } from 'react';
import { IconPlay } from '@wanteddev/wds-icon';

import FlexBox from '../flex-box';

import { playIconBadgeStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { PlayIconBadgeProps } from './types';

const PlayIconBadge = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<PlayIconBadgeProps, 'div'>
>(
  (
    { size = 'medium', alternative = false, xs, sm, md, lg, xl, ...props },
    ref,
  ) => {
    return (
      <FlexBox
        ref={ref}
        {...props}
        sx={[
          playIconBadgeStyle({
            size,
            alternative,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      >
        <IconPlay />
      </FlexBox>
    );
  },
);

PlayIconBadge.displayName = 'PlayIconBadge';

export default PlayIconBadge;
