import { forwardRef } from 'react';

import FlexBox from '../flex-box';
import Button from '../button';

import {
  EMPTY_STATE_BUTTON_NAME,
  EMPTY_STATE_CONTENT_NAME,
  EMPTY_STATE_NAME,
  EMPTY_STATE_TEXT_NAME,
} from './constants';
import { emptyStateStyle } from './style';

import type { ButtonProps } from '../button/types';
import type { FlexBoxProps } from '../flex-box/types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type { EmptyStateProps, EmptyStateTextProps } from './types';

const EmptyState = forwardRef(
  <E extends ElementType = 'div'>(
    {
      as,
      platform = 'desktop',
      padding = 'normal',
      width,
      children,
      xs,
      sm,
      md,
      lg,
      xl,
      sx,
      ...props
    }: PolymorphicProps<EmptyStateProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return (
      <FlexBox
        as={(as || 'div') as E}
        ref={ref}
        flexDirection="column"
        alignItems="center"
        sx={[
          emptyStateStyle({ platform, padding, width, xs, sm, md, lg, xl }),
          sx,
        ]}
        {...props}
      >
        {children}
      </FlexBox>
    );
  },
) as PolymorphicComponent<EmptyStateProps, 'div'>;

EmptyState.displayName = EMPTY_STATE_NAME;

const EmptyStateContent = forwardRef(
  (
    props: DefaultComponentProps<FlexBoxProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        flexDirection="column"
        alignItems="center"
        gap="24px"
        {...props}
      />
    );
  },
);

EmptyStateContent.displayName = EMPTY_STATE_CONTENT_NAME;

const EmptyStateText = forwardRef(
  (
    { heading, description, ...props }: EmptyStateTextProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox ref={ref} flexDirection="column" gap="12px" {...props}>
        {heading && <span data-role="empty-state-text-heading">{heading}</span>}
        <span data-role="empty-state-text-description">{description}</span>
      </FlexBox>
    );
  },
);

EmptyStateText.displayName = EMPTY_STATE_TEXT_NAME;

const EmptyStateButton = forwardRef(
  (
    props: DefaultComponentProps<ButtonProps, 'button'>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <Button
        ref={ref}
        wds-component="empty-state-button"
        variant="outlined"
        color="assistive"
        {...props}
      />
    );
  },
);

EmptyStateButton.displayName = EMPTY_STATE_BUTTON_NAME;

export { EmptyState, EmptyStateContent, EmptyStateText, EmptyStateButton };
