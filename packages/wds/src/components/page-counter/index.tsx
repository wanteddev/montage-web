import { forwardRef } from 'react';
import { Box } from '@wanteddev/wds-engine';

import { FlexBox } from '../flex-box';

import { backgroundBlendStyle, pageCounterStyle } from './style';

import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';
import type { PageCounterProps } from './types';

const PageCounter = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PageCounterProps, 'div'>
>(
  (
    {
      totalPages = 3,
      currentPage = 1,
      size = 'medium',
      alternative = false,
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
      <FlexBox
        ref={ref}
        {...props}
        alignItems="center"
        sx={[
          pageCounterStyle({ size, alternative, xs, sm, md, lg, xl }),
          props.sx,
        ]}
      >
        {!alternative && (
          <Box
            as="span"
            role="presentation"
            data-role="page-counter-background-blend"
            sx={backgroundBlendStyle}
          />
        )}

        <span data-role="page-counter-text">{currentPage}</span>
        <span data-role="page-counter-divider">/</span>
        <span data-role="page-counter-text">{totalPages}</span>
      </FlexBox>
    );
  },
);

PageCounter.displayName = 'PageCounter';

export { PageCounter };

export type { PageCounterProps };
