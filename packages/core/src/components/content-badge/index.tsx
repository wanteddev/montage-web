import { forwardRef } from 'react';
import { Box } from '@montage-ui/engine';

import { useInheritedSize } from '../../hooks/internal/use-slot-defaults';

import { contentBadgeStyle } from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { ContentBadgeProps } from './types';

const ContentBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<ContentBadgeProps, 'span'>
>(
  (
    {
      variant = 'solid',
      size: originSize,
      color = 'accent',
      accentColor = 'semantic.foreground.accent.cyan',
      neutralColor = 'semantic.foreground.neutral.tertiary',
      leadingContent,
      trailingContent,
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
    const { size: inheritedSize, responsive } = useInheritedSize(
      'ContentBadge',
      originSize,
      { xs, sm, md, lg, xl },
    );
    const size = inheritedSize ?? 'xsmall';

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
            neutralColor,
            ...responsive,
          }),
          props.sx,
        ]}
      >
        {Boolean(leadingContent) && leadingContent}
        <span>{children}</span>
        {Boolean(trailingContent) && trailingContent}
      </Box>
    );
  },
);

ContentBadge.displayName = 'ContentBadge';

export { ContentBadge };

export type { ContentBadgeProps };
