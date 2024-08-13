import { forwardRef } from 'react';

import FlexBox from '../flex-box';
import Typography from '../typography';
import Button from '../button';
import TextButton from '../text-button';
import { useModalActionAreaContext } from '../modal/contexts';

import { ACTION_AREA_BUTTON_NAME, ACTION_AREA_NAME } from './constants';
import { ActionAreaProvider, useActionAreaContext } from './contexts';
import { actionAreaStyle, actionButtonSingle } from './style';

import type { ActionAreaProps, ActionButtonProps } from './types';
import type { ElementRef, ElementType, ForwardedRef, ReactNode } from 'react';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';

const ActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ActionAreaProps, 'div'>
>(
  (
    {
      variant = 'normal',
      extraContent,
      compactContent,
      priority = 'strong',
      children,
      caption,
      sticky,
      ...props
    },
    ref,
  ) => {
    const modalOption = useModalActionAreaContext();

    const modalSticky =
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      modalOption !== undefined
        ? modalOption.sticky && modalOption.hasScroll
        : undefined;

    return (
      <ActionAreaProvider priority={priority}>
        <FlexBox
          wds-component="action-area"
          ref={ref}
          flexShrink={0}
          flexDirection="column"
          {...props}
          sx={[
            actionAreaStyle({
              variant,
              priority,
              sticky: variant === 'extra' ? false : sticky ?? modalSticky,
            }),
            props.sx,
          ]}
        >
          {variant === 'extra' && Boolean(extraContent) && (
            <FlexBox
              gap="8px"
              flexDirection="column"
              alignItems="center"
              data-role="action-area-extra-content"
              sx={{
                marginBottom:
                  'var(--wds--action-area-extra-content-margin, calc(4px + var(--wds-action-area-margin-y, 20px)))',
              }}
            >
              {extraContent}
            </FlexBox>
          )}

          {Boolean(caption) && (
            <Typography
              align="center"
              variant="label2"
              weight="regular"
              data-role="action-area-caption"
              color="palette.label.alternative"
              sx={{ marginBottom: '16px' }}
            >
              {caption}
            </Typography>
          )}
          {priority === 'compact' && Boolean(compactContent) ? (
            <FlexBox justifyContent="space-between" alignItems="center">
              <FlexBox
                flexDirection="row"
                data-role="action-area-compact-content"
              >
                {compactContent}
              </FlexBox>
              <FlexBox flexShrink={0} gap="8px" data-role="action-area-wrapper">
                {children}
              </FlexBox>
            </FlexBox>
          ) : (
            <FlexBox
              flexDirection={priority === 'strong' ? 'column' : 'row'}
              gap="8px"
              data-role="action-area-wrapper"
              alignSelf={priority === 'compact' ? 'flex-end' : 'initial'}
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
  <E extends ElementType = 'button'>(
    {
      variant = 'main',
      textButtonVariant,
      buttonVariant,
      buttonColor,
      ...props
    }: PolymorphicProps<ActionButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { priority } = useActionAreaContext(ACTION_AREA_BUTTON_NAME);

    const renderComponent: {
      [key in typeof variant]: ReactNode;
    } = {
      main: (
        <Button
          ref={ref}
          variant={
            buttonVariant ?? (priority === 'single' ? 'outlined' : 'solid')
          }
          color={
            buttonColor ?? (priority === 'single' ? 'assistive' : 'primary')
          }
          size="large"
          fullWidth={priority === 'strong' || priority === 'single'}
          {...props}
          sx={[actionButtonSingle({ priority, variant }), props.sx]}
        />
      ),
      alternative: (
        <Button
          ref={ref}
          variant={buttonVariant ?? 'outlined'}
          size="large"
          color={buttonColor ?? 'secondary'}
          fullWidth={priority === 'strong'}
          {...props}
          sx={[actionButtonSingle({ priority, variant }), props.sx]}
        />
      ),
      sub:
        priority === 'strong' ? (
          <TextButton
            ref={ref}
            variant={textButtonVariant ?? 'assistive'}
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
            sx={[actionButtonSingle({ priority, variant }), props.sx]}
          />
        ),
    };

    return renderComponent[variant];
  },
) as PolymorphicComponent<ActionButtonProps, 'button'>;

ActionAreaButton.displayName = ACTION_AREA_BUTTON_NAME;

export { ActionArea, ActionAreaButton };
