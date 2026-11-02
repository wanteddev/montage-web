import { IconPlay } from '@montage-ui/icon';
import { forwardRef } from 'react';

import { FlexBox } from '../flex-box';

import { playBadgeStyle } from './style';

import type { PlayBadgeProps } from './types';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';

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
