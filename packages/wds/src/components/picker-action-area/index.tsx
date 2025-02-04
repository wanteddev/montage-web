import { forwardRef } from 'react';
import { composeEventHandlers } from '@radix-ui/primitive';

import { ActionArea, ActionAreaButton } from '../action-area';
import { dateTypeToDateObject } from '../date-calendar/helpers';

import { pickerActionAreaStyle } from './style';
import { PICKER_ACTION_AREA_BUTTON_NAME } from './constants';
import { usePickerActionAreaContext } from './contexts';

import type { PickerActionAreaButtonProps } from './types';
import type { ElementType, ForwardedRef } from 'react';
import type { ActionAreaProps } from '../action-area/types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';

const PickerActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ActionAreaProps, 'div'>
>(({ sx, ...props }, ref) => {
  return (
    <ActionArea
      ref={ref}
      priority="strong"
      sticky
      {...props}
      sx={[pickerActionAreaStyle, sx]}
    />
  );
});

PickerActionArea.displayName = 'PickerActionArea';

const PickerActionAreaButton = forwardRef(
  <T extends ElementType = 'button'>(
    { variant, ...props }: PolymorphicProps<PickerActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { initialValue, value, timezone, onChangeComplete } =
      usePickerActionAreaContext(PICKER_ACTION_AREA_BUTTON_NAME);

    switch (variant) {
      case 'now':
        return (
          <ActionAreaButton
            ref={ref}
            property="compact"
            variant="sub"
            textButtonVariant="assistive"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(dateTypeToDateObject(new Date(), timezone));
            })}
          />
        );
      case 'cancel':
        return (
          <ActionAreaButton
            ref={ref}
            property="compact"
            variant="sub"
            textButtonVariant="assistive"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(initialValue.current);
            })}
          />
        );
      case 'reset':
        return (
          <ActionAreaButton
            ref={ref}
            property="compact"
            variant="sub"
            textButtonVariant="assistive"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(undefined);
            })}
          />
        );
      case 'accept':
        return (
          <ActionAreaButton
            ref={ref}
            property="compact"
            variant="sub"
            textButtonVariant="primary"
            {...props}
            onClick={composeEventHandlers(props.onClick, () => {
              onChangeComplete(value);
            })}
          />
        );
      default:
        return (
          <ActionAreaButton
            ref={ref}
            property="compact"
            variant="sub"
            textButtonVariant="primary"
            {...props}
          />
        );
    }
  },
) as PolymorphicComponent<PickerActionAreaButtonProps, 'button'>;

PickerActionAreaButton.displayName = PICKER_ACTION_AREA_BUTTON_NAME;

export { PickerActionArea, PickerActionAreaButton };
