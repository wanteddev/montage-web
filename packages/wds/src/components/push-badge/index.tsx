'use client';
import { forwardRef } from 'react';

import { pushBadgeStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { ReactNode } from 'react';
import type { PushBadgeProps } from './types';

type Props = MergeElementProps<'span', PushBadgeProps>;

const PushBadge = forwardRef<HTMLSpanElement, Props>(
  ({ variant = 'dot', children, ...props }, ref) => {
    const renderChild: {
      [key in Exclude<PushBadgeProps['variant'], undefined>]: ReactNode;
    } = {
      ['dot']: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 4 4"
          fill="none"
          css={{
            width: '4px',
            height: '4px',
          }}
        >
          <circle
            cx="2"
            cy="2"
            r="2"
            css={(theme) => ({
              fill: theme.palette.primary.normal,
            })}
          />
        </svg>
      ),
      ['number']: children,
      ['new']: 'N',
    };

    return (
      <span ref={ref} css={pushBadgeStyle({ variant })} {...props}>
        {renderChild[variant]}
      </span>
    );
  },
);

PushBadge.displayName = 'PushBadge';

export default PushBadge;
