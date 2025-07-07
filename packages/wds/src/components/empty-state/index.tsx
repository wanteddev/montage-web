import { forwardRef } from 'react';
import {
  type DefaultComponentProps,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '@wanteddev/wds-engine';

import FlexBox from '../flex-box';
import Button from '../button';

import {
  EMPTY_STATE_BUTTON_NAME,
  EMPTY_STATE_CONTENT_NAME,
  EMPTY_STATE_IMAGE_NAME,
  EMPTY_STATE_NAME,
  EMPTY_STATE_TEXT_NAME,
} from './constants';
import { emptyStateStyle } from './style';

import type { ButtonProps } from '../button/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { ElementType, ForwardedRef } from 'react';
import type {
  EmptyStateImageProps,
  EmptyStateProps,
  EmptyStateTextProps,
} from './types';

const EmptyState = forwardRef(
  <T extends ElementType = 'div'>(
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
    }: PolymorphicProps<EmptyStateProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <FlexBox
        as={as || 'div'}
        ref={ref}
        flexDirection="column"
        alignItems="center"
        sx={[
          emptyStateStyle({
            platform,
            padding,
            width,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
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

const EmptyStateImage = forwardRef(
  (
    props: DefaultComponentProps<EmptyStateImageProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        wds-component="empty-state-image"
        justifyContent="center"
        alignItems="center"
        {...props}
      />
    );
  },
);

EmptyStateImage.displayName = EMPTY_STATE_IMAGE_NAME;

const EmptyStateContent = forwardRef(
  (
    props: DefaultComponentProps<FlexBoxProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox
        ref={ref}
        wds-component="empty-state-content"
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
    {
      title,
      description,
      ...props
    }: DefaultComponentProps<EmptyStateTextProps, 'div'>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <FlexBox ref={ref} flexDirection="column" gap="12px" {...props}>
        {title && <span data-role="empty-state-text-title">{title}</span>}
        <span data-role="empty-state-text-description">{description}</span>
      </FlexBox>
    );
  },
);

EmptyStateText.displayName = EMPTY_STATE_TEXT_NAME;

const EmptyStateButton = forwardRef(
  <T extends ElementType = 'button'>(
    { as, ...props }: PolymorphicProps<ButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    return (
      <Button
        as={(as || 'button') as ElementType}
        ref={ref}
        wds-component="empty-state-button"
        variant="outlined"
        color="assistive"
        {...props}
      />
    );
  },
) as PolymorphicComponent<ButtonProps, 'button'>;

EmptyStateButton.displayName = EMPTY_STATE_BUTTON_NAME;

export {
  EmptyState,
  EmptyStateImage,
  EmptyStateContent,
  EmptyStateText,
  EmptyStateButton,
};
