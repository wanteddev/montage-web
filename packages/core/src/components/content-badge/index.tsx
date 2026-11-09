import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import { useInheritedSize } from '../../hooks/internal/use-slot-defaults';

import { contentBadgeStyle } from './style';

import type { ContentBadgeProps } from './types';
import type { DefaultComponentPropsInternal } from '@montage-ui/engine';

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
      accentBackgroundColor,
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
            accentBackgroundColor,
            neutralColor,
            ...responsive,
          }),
          props.sx,
        ]}
      >
        {Boolean(leadingContent) && leadingContent}
        <span data-role="content-badge-text">{children}</span>
        {Boolean(trailingContent) && trailingContent}
      </Box>
    );
  },
);

ContentBadge.displayName = 'ContentBadge';

export { ContentBadge };

export type { ContentBadgeProps };
