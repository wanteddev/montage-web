import { forwardRef } from 'react';
import { Box } from '@montage-ui/engine';

import { FlexBox } from '../flex-box';

import { pushBadgeStyle, pushBadgeWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@montage-ui/engine';
import type { ReactNode } from 'react';
import type { PushBadgeProps } from './types';

const PushBadge = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PushBadgeProps, 'div'>
>(
  (
    {
      variant = 'dot',
      position = 'top-right',
      children,
      size = 'xsmall',
      text,
      maxCount = 99,
      invisible = false,
      outlineBorder = false,
      outlineBorderColor = 'semantic.background.neutral.primary',
      offsetX,
      offsetY,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    const renderChild: {
      [key in Exclude<PushBadgeProps['variant'], undefined>]: ReactNode;
    } = {
      ['dot']: (
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 4 4"
          fill="none"
          width="1em"
          height="1em"
        >
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </Box>
      ),
      ['text']: text,
      ['max-count']:
        typeof text === 'number' && text > maxCount ? `${maxCount}+` : text,
    };

    return (
      <FlexBox
        data-role="push-badge-wrapper"
        ref={ref}
        {...props}
        sx={[
          pushBadgeWrapperStyle({
            shouldFixedWidth: typeof text === 'string' && text.length === 1,
            variant,
            offsetX,
            offsetY,
            size,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          props.sx,
        ]}
      >
        {children}

        <Box
          as="span"
          data-component="push-badge"
          data-variant={variant}
          aria-hidden={invisible}
          sx={pushBadgeStyle({
            variant,
            invisible,
            position,
            outlineBorder,
            outlineBorderColor,
          })}
        >
          {renderChild[variant]}
        </Box>
      </FlexBox>
    );
  },
);

PushBadge.displayName = 'PushBadge';

export { PushBadge };

export type { PushBadgeProps };
