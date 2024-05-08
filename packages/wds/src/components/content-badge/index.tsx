'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { contentBadgeStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ContentBadgeProps } from './types';

const ContentBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentProps<ContentBadgeProps, 'span'>
>(
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
      <Box
        as="span"
        ref={ref}
        {...props}
        sx={[
          contentBadgeStyle({
            variant,
            size,
            color,
            accentColor,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      >
        {Boolean(leftIcon) && leftIcon}
        <span>{children}</span>
        {Boolean(rightIcon) && rightIcon}
      </Box>
    );
  },
);

ContentBadge.displayName = 'ContentBadge';

export default ContentBadge;
