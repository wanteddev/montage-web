'use client';
import { forwardRef } from 'react';

import { contentBadgeStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { ContentBadgeProps } from './types';

type Props = MergeElementProps<'span', ContentBadgeProps>;

const ContentBadge = forwardRef<HTMLSpanElement, Props>(
  (
    {
      variant = 'filled',
      size = 'small',
      color = 'accent',
      accentColor = 'palette.accent.cyan',
      leftIcon,
      rightIcon,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        css={contentBadgeStyle({
          variant,
          size,
          color,
          accentColor,
          xs,
          sm,
          md,
          lg,
          xl,
        })}
        {...props}
      >
        {Boolean(leftIcon) && leftIcon}
        <span>{children}</span>
        {Boolean(rightIcon) && rightIcon}
      </span>
    );
  },
);

ContentBadge.displayName = 'ContentBadge';

export default ContentBadge;
