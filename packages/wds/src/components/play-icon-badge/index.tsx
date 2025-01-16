'use client';
import { forwardRef } from 'react';
import { IconPlay } from '@wanteddev/wds-icon';
import { Box, type DefaultComponentProps } from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';

import {
  backgroundBlendLayerStyle,
  backgroundBlendStyle,
  playIconBadgeStyle,
} from './style';

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
        {!alternative && (
          <>
            <Box
              as="span"
              role="presentation"
              data-role="pagination-counter-background-blend"
              sx={backgroundBlendStyle}
            />
            <Box
              as="span"
              role="presentation"
              data-role="pagination-counter-background-blend-layer"
              sx={backgroundBlendLayerStyle}
            />
          </>
        )}
        <IconPlay />
      </FlexBox>
    );
  },
);

PlayIconBadge.displayName = 'PlayIconBadge';

export default PlayIconBadge;
