import { forwardRef, useId } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { IconCaretDown, IconCaretUp } from '@wanteddev/wds-icon';

import { WithInteraction } from '../with-interaction';
import { FlexBox } from '../flex-box';

import { filterButtonStyle } from './style';

import type {
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type { ElementType, ForwardedRef } from 'react';
import type { FilterButtonProps } from './types';

const FilterButton = forwardRef(
  <T extends ElementType = 'button'>(
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
    }: PolymorphicPropsInternal<FilterButtonProps, T>,
    ref: ForwardedRef<T>,
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
          as={as || 'button'}
          aria-labelledby={id}
          role="button"
          type="button"
          ref={ref}
          disabled={disabled}
          aria-disabled={disabled}
          aria-pressed={active}
          aria-expanded={expanded}
          {...props}
          sx={[
            filterButtonStyle({ variant, size, xs, sm, md, lg, xl }),
            props.sx,
          ]}
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
) as PolymorphicComponentInternal<FilterButtonProps, 'button'>;

FilterButton.displayName = 'FilterButton';

export { FilterButton };

export type { FilterButtonProps };
