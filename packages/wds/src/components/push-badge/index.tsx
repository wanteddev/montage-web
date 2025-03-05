'use client';
import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import Typography from '../typography';

import { pushBadgeStyle } from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { PushBadgeProps } from './types';

const PushBadge = forwardRef<
  HTMLSpanElement,
  DefaultComponentProps<PushBadgeProps, 'span'>
>(({ variant = 'dot', children, ...props }, ref) => {
  const renderChild: {
    [key in Exclude<PushBadgeProps['variant'], undefined>]: ReactNode;
  } = {
    ['dot']: (
      <Box
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4 4"
        fill="none"
        sx={(theme) => ({
          width: '4px',
          height: '4px',
          color: theme.palette.primary.normal,
        })}
      >
        <circle cx="2" cy="2" r="2" fill="currentColor" />
      </Box>
    ),
    ['number']: children,
    ['new']: 'N',
  };

  return (
    <Box
      as="span"
      ref={ref}
      {...props}
      wds-component="push-badge"
      data-variant={variant}
      sx={[pushBadgeStyle({ variant }), props.sx]}
    >
      {variant === 'dot' ? (
        renderChild[variant]
      ) : (
        <Typography variant="caption2" weight="bold" align="center">
          {renderChild[variant]}
        </Typography>
      )}
    </Box>
  );
});

PushBadge.displayName = 'PushBadge';

export default PushBadge;
