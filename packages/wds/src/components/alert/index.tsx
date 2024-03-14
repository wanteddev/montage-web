'use client';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useCallback, useId } from 'react';
import {
  IconCircleCheck,
  IconCircleExclamation,
  IconCircleInfo,
  IconClose,
  IconTriangleExclamation,
} from '@wanteddev/wds-icon';
import { useTheme } from '@emotion/react';

import { addOpacity } from '@/utils';

import Portal from '../portal';
import Typography from '../typography';
import FlexBox from '../flex-box';
import IconButton from '../icon-button';

import { topRegionStatusStyle } from './style';

import type { CSSProperties, ReactNode } from 'react';
import type { AlertProps } from './types';
import type { MergeElementProps } from '@/types';

type Props = MergeElementProps<'div', AlertProps>;

const Alert = forwardRef<HTMLDivElement, Props>(
  (
    {
      show: originShow,
      defaultShow,
      onShowChange,
      variant = 'normal',
      children,
      ...props
    },
    ref,
  ) => {
    const [show = false, setShow] = useControllableState({
      prop: originShow,
      defaultProp: defaultShow,
      onChange: onShowChange,
    });

    const handleShowToggle = useCallback(
      () => setShow((prevShow) => !prevShow),
      [setShow],
    );

    const descriptionId = useId();

    const theme = useTheme();

    const iconComponent: {
      [key in Exclude<AlertProps['variant'], undefined>]: ReactNode;
    } = {
      normal: null,
      success: (
        <IconCircleCheck
          css={{
            color: theme.palette.status.positive,
          }}
        />
      ),
      error: (
        <IconCircleExclamation
          css={{
            color: theme.palette.status.negative,
          }}
        />
      ),
      warning: (
        <IconTriangleExclamation
          css={{
            color: theme.palette.status.cautionary,
          }}
        />
      ),
      info: (
        <IconCircleInfo
          css={{
            color: theme.palette.interaction.inactive,
          }}
        />
      ),
    };

    const backgroundColor: {
      [key in Exclude<AlertProps['variant'], undefined>]: string;
    } = {
      normal: addOpacity(theme.palette.label.neutral, theme.opacity[5]),
      success: addOpacity(theme.palette.status.positive, theme.opacity[5]),
      error: addOpacity(theme.palette.status.negative, theme.opacity[5]),
      warning: addOpacity(theme.palette.status.cautionary, theme.opacity[5]),
      info: addOpacity(theme.palette.label.neutral, theme.opacity[5]),
    };

    return (
      <>
        {show && (
          <Portal
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            container={globalThis?.document?.querySelector(
              '#wds-region-manager-top',
            )}
          >
            <div
              ref={ref}
              aria-atomic
              role={variant === 'error' ? 'alert' : 'status'}
              aria-live={variant === 'error' ? 'assertive' : 'polite'}
              css={topRegionStatusStyle}
              aria-describedby={descriptionId}
              {...props}
              style={
                {
                  ...props.style,
                  '--wds-region-top-item-background': backgroundColor[variant],
                } as CSSProperties
              }
            >
              <FlexBox
                gap="10px"
                alignItems="center"
                css={{ ['& svg']: { flexShrink: 0 } }}
              >
                {iconComponent[variant]}

                <Typography
                  color="palette.label.normal"
                  variant="label1_normal"
                  weight="medium"
                  id={descriptionId}
                >
                  {children}
                </Typography>
              </FlexBox>

              <FlexBox alignItems="center" flexShrink={0}>
                <IconButton
                  color="palette.label.alternative"
                  interactionColor="palette.label.alternative"
                  onClick={handleShowToggle}
                  size={20}
                  css={{ fontSize: '20px' }}
                >
                  <IconClose />
                </IconButton>
              </FlexBox>
            </div>
          </Portal>
        )}
      </>
    );
  },
);

Alert.displayName = 'Alert';

export default Alert;
