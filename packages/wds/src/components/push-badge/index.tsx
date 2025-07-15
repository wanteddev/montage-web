import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { Typography } from '../typography';
import { FlexBox } from '../flex-box';

import { pushBadgeStyle, pushBadgeWrapperStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
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
      count,
      invisible = false,
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
      ['number']: count,
      ['new']: 'N',
    };

    return (
      <FlexBox
        data-role="push-badge-wrapper"
        ref={ref}
        {...props}
        sx={[
          pushBadgeWrapperStyle({
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
          wds-component="push-badge"
          data-variant={variant}
          sx={pushBadgeStyle({ variant, invisible, position })}
        >
          {variant === 'dot'
            ? renderChild[variant]
            : !invisible && (
                <Typography
                  data-role="push-badge-text"
                  variant="caption2"
                  weight="bold"
                  align="center"
                >
                  {renderChild[variant]}
                </Typography>
              )}
        </Box>
      </FlexBox>
    );
  },
);

PushBadge.displayName = 'PushBadge';

export { PushBadge };

export type { PushBadgeProps };
