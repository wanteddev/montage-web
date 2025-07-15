import { forwardRef } from 'react';
import { IconPlay } from '@wanteddev/wds-icon';

import { FlexBox } from '../flex-box';

import { playBadgeStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { PlayBadgeProps } from './types';

const PlayBadge = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PlayBadgeProps, 'div'>
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
          playBadgeStyle({
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

PlayBadge.displayName = 'PlayBadge';

export { PlayBadge };

export type { PlayBadgeProps };
