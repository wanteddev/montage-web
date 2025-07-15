import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { contentBadgeStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { ContentBadgeProps } from './types';

const ContentBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentPropsInternal<ContentBadgeProps, 'span'>
>(
  (
    {
      variant = 'solid',
      size = 'xsmall',
      color = 'accent',
      accentColor = 'semantic.accent.foreground.cyan',
      neutralColor = 'semantic.label.alternative',
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
            xs,
            sm,
            md,
            lg,
            xl,
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
