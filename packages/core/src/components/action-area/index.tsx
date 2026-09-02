import { forwardRef } from 'react';

import { FlexBox } from '../flex-box';
import { Button } from '../button';
import { TextButton } from '../text-button';
import { useModalActionAreaContext } from '../modal/contexts';

import { ACTION_AREA_BUTTON_NAME, ACTION_AREA_NAME } from './constants';
import { ActionAreaProvider, useActionAreaContext } from './contexts';
import { actionAreaStyle, actionButtonCancel, captionStyle } from './style';

import type { ActionAreaButtonProps, ActionAreaProps } from './types';
import type { ElementType, ForwardedRef, ReactNode } from 'react';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';

const ActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ActionAreaProps, 'div'>
>(
  (
    {
      extra = false,
      extraContent,
      compactContent,
      variant = 'strong',
      children,
      caption,
      captionIcon,
      background,
      backgroundColor = 'semantic.surface.elevated.primary',
      divider = true,
      ...props
    },
    ref,
  ) => {
    const modalOption = useModalActionAreaContext();

    const modalSticky =
      modalOption !== undefined ? modalOption.sticky : undefined;

    return (
      <ActionAreaProvider variant={variant}>
        <FlexBox
          data-component="action-area"
          ref={ref}
          flexShrink={0}
          flexDirection="column"
          {...props}
          sx={[
            actionAreaStyle({
              divider,
              extra,
              background: extra ? false : (background ?? modalSticky),
              backgroundColor,
            }),
            props.sx,
          ]}
        >
          {extra && Boolean(extraContent) && (
            <FlexBox
              gap="8px"
              flexDirection="column"
              alignItems="center"
              data-role="action-area-extra-content"
              sx={(theme) => ({
                padding: `${theme.spacing[0]} ${theme.spacing[4]} var(--action-area-margin-y, 20px)`,
              })}
            >
              {extraContent}
            </FlexBox>
          )}

          {variant !== 'compact' &&
            variant !== 'cancel' &&
            Boolean(caption) && (
              <FlexBox
                as="span"
                data-role="action-area-caption"
                sx={[
                  captionStyle,
                  (theme) => ({ marginBottom: theme.spacing[16] }),
                ]}
                justifyContent="center"
              >
                {captionIcon}
                <span>{caption}</span>
              </FlexBox>
            )}
          {variant === 'compact' &&
          (Boolean(compactContent) || Boolean(caption)) ? (
            <FlexBox
              alignItems="center"
              gap="12px"
              justifyContent="space-between"
              data-role="action-area-compact-wrapper"
            >
              <FlexBox
                alignItems="center"
                gap="12px"
                data-role="action-area-compact-content-wrapper"
              >
                {caption && (
                  <FlexBox
                    as="span"
                    data-role="action-area-caption"
                    sx={captionStyle}
                  >
                    {captionIcon}
                    <span>{caption}</span>
                  </FlexBox>
                )}
                {compactContent && (
                  <FlexBox
                    flexDirection="row"
                    data-role="action-area-compact-content"
                  >
                    {compactContent}
                  </FlexBox>
                )}
              </FlexBox>
              <FlexBox
                flexShrink={0}
                gap="12px"
                data-role="action-area-wrapper"
              >
                {children}
              </FlexBox>
            </FlexBox>
          ) : (
            <FlexBox
              flexDirection={variant === 'strong' ? 'column' : 'row'}
              gap={variant === 'strong' ? '8px' : '12px'}
              data-role="action-area-wrapper"
              alignSelf={variant === 'compact' ? 'flex-end' : 'initial'}
            >
              {children}
            </FlexBox>
          )}
        </FlexBox>
      </ActionAreaProvider>
    );
  },
);

ActionArea.displayName = ACTION_AREA_NAME;

const ActionAreaButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      variant = 'main',
      textButtonColor,
      buttonVariant,
      buttonColor,
      ...props
    }: PolymorphicPropsInternal<ActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { variant: parentVariant } = useActionAreaContext(
      ACTION_AREA_BUTTON_NAME,
    );

    const renderComponent: {
      [key in typeof variant]: ReactNode;
    } = {
      main: (
        <Button
          ref={ref}
          variant={buttonVariant ?? 'solid'}
          color={
            buttonColor ??
            (parentVariant === 'cancel' ? 'assistive' : 'primary')
          }
          size="large"
          fullWidth={parentVariant === 'strong' || parentVariant === 'cancel'}
          {...props}
          sx={[actionButtonCancel({ variant, parentVariant }), props.sx]}
        />
      ),
      alternative: (
        <Button
          ref={ref}
          variant={buttonVariant ?? 'outlined'}
          size="large"
          color={buttonColor ?? 'assistive'}
          fullWidth={parentVariant === 'strong'}
          {...props}
          sx={[actionButtonCancel({ variant, parentVariant }), props.sx]}
        />
      ),
      sub:
        parentVariant === 'strong' ? (
          <TextButton
            ref={ref}
            color={textButtonColor ?? 'assistive'}
            size="small"
            {...props}
            sx={[
              {
                margin: '8px 0px',
                width: 'fit-content',
                alignSelf: 'center',
              },
              props.sx,
            ]}
          />
        ) : (
          <Button
            ref={ref}
            variant={buttonVariant ?? 'outlined'}
            color={buttonColor ?? 'assistive'}
            size="large"
            {...props}
            sx={[actionButtonCancel({ variant, parentVariant }), props.sx]}
          />
        ),
    };

    return renderComponent[variant];
  },
) as PolymorphicComponentInternal<ActionAreaButtonProps, 'button'>;

ActionAreaButton.displayName = ACTION_AREA_BUTTON_NAME;

export { ActionArea, ActionAreaButton };

export type { ActionAreaProps, ActionAreaButtonProps };
