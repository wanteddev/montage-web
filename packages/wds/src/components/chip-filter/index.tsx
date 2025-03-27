'use client';
import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { IconCaretDown, IconCaretUp } from '@wanteddev/wds-icon';

import WithInteraction from '../with-interaction';
import FlexBox from '../flex-box';

import { actionStyle } from './style';

import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { ChipFilterProps } from './types';

const ChipFilter = forwardRef(
  <E extends ElementType = 'button'>(
    {
      as,
      variant = 'solid',
      disabled = false,
      disableInteraction = false,
      expanded: originExpanded,
      size = 'medium',
      activeLabel,
      active: givenActive,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    }: PolymorphicProps<ChipFilterProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const id = useId();

    const active = givenActive ?? props['aria-pressed'];

    const expanded = originExpanded || props['aria-expanded'];

    return (
      <WithInteraction
        color={
          active && variant === 'outlined'
            ? 'semantic.primary.normal'
            : 'semantic.label.normal'
        }
        disabled={disableInteraction || disabled}
      >
        <Box
          as={(as || 'button') as E}
          aria-labelledby={id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          aria-pressed={active}
          aria-expanded={expanded}
          tabIndex={0}
          {...props}
          sx={[actionStyle({ variant, size, xs, sm, md, lg, xl }), props.sx]}
        >
          <FlexBox data-role="chip-filter-wrapper" alignItems="center">
            <span id={id}>{children}</span>
            {activeLabel !== null && activeLabel !== undefined && active && (
              <span data-role="chip-filter-active-label">{activeLabel}</span>
            )}
          </FlexBox>
          {expanded ? <IconCaretUp /> : <IconCaretDown />}
        </Box>
      </WithInteraction>
    );
  },
) as PolymorphicComponent<ChipFilterProps, 'button'>;

ChipFilter.displayName = 'ChipFilter';

export default ChipFilter;
