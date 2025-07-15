import { forwardRef } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';

import { ActionArea } from '../action-area';
import { dateTypeToDateObject } from '../date-calendar/helpers';
import { TextButton } from '../text-button';

import { pickerActionAreaStyle } from './style';
import { PICKER_ACTION_AREA_BUTTON_NAME } from './constants';
import { usePickerActionAreaContext } from './contexts';

import type {
  PickerActionAreaButtonProps,
  PickerActionAreaProps,
} from './types';
import type { ElementType, ForwardedRef } from 'react';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

const PickerActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<PickerActionAreaProps, 'div'>
>(({ sx, ...props }, ref) => {
  return (
    <ActionArea
      ref={ref}
      variant="strong"
      {...props}
      sx={[pickerActionAreaStyle, sx]}
    />
  );
});

PickerActionArea.displayName = 'PickerActionArea';

const PickerActionAreaButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      variant,
      buttonVariant,
      ...props
    }: PolymorphicPropsInternal<PickerActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { initialValue, value, timezone, onChangeComplete } =
      usePickerActionAreaContext(PICKER_ACTION_AREA_BUTTON_NAME);

    switch (variant) {
      case 'now':
        return (
          <TextButton
            ref={ref}
            variant={buttonVariant ?? 'assistive'}
            size="small"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(dateTypeToDateObject(new Date(), timezone));
            })}
            sx={[
              {
                margin: '0px 6px',
              },
              props.sx,
            ]}
          />
        );
      case 'cancel':
        return (
          <TextButton
            ref={ref}
            variant={buttonVariant ?? 'assistive'}
            size="small"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(initialValue.current);
            })}
            sx={[
              {
                margin: '0px 6px',
              },
              props.sx,
            ]}
          />
        );
      case 'reset':
        return (
          <TextButton
            ref={ref}
            variant={buttonVariant ?? 'assistive'}
            size="small"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(undefined);
            })}
            sx={[
              {
                margin: '0px 6px',
              },
              props.sx,
            ]}
          />
        );
      case 'accept':
        return (
          <TextButton
            ref={ref}
            variant={buttonVariant ?? 'primary'}
            size="small"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(value);
            })}
            sx={[
              {
                margin: '0px 6px',
              },
              props.sx,
            ]}
          />
        );
      default:
        return (
          <TextButton
            ref={ref}
            variant={buttonVariant ?? 'assistive'}
            size="small"
            {...props}
            sx={[
              {
                margin: '0px 6px',
              },
              props.sx,
            ]}
          />
        );
    }
  },
) as PolymorphicComponentInternal<PickerActionAreaButtonProps, 'button'>;

PickerActionAreaButton.displayName = PICKER_ACTION_AREA_BUTTON_NAME;

export { PickerActionArea, PickerActionAreaButton };

export type { PickerActionAreaProps, PickerActionAreaButtonProps };
