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
import { Box, useTheme } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils/color';
import Typography from '../typography';
import FlexBox from '../flex-box';
import IconButton from '../icon-button';
import { useRegionStore } from '../../stores/region-store';
import PortalOrFragment from '../portal-or-fragment';

import { sectionMessageWrapperStyle, topRegionStatusStyle } from './style';

import type { CSSProperties, ReactNode } from 'react';
import type { SectionMessageProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const SectionMessage = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SectionMessageProps, 'div'>
>(
  (
    {
      show: originShow,
      defaultShow,
      onShowChange,
      variant = 'normal',
      children,
      wrapperProps,
      disablePortal,
      container,
      closeIcon = true,
      ...props
    },
    ref,
  ) => {
    const config = useRegionStore((state) => state.config);

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
      [key in Exclude<SectionMessageProps['variant'], undefined>]: ReactNode;
    } = {
      normal: null,
      success: (
        <IconCircleCheck
          sx={{
            color: theme.palette.status.positive,
          }}
        />
      ),
      error: (
        <IconCircleExclamation
          sx={{
            color: theme.palette.status.negative,
          }}
        />
      ),
      warning: (
        <IconTriangleExclamation
          sx={{
            color: theme.palette.status.cautionary,
          }}
        />
      ),
      info: (
        <IconCircleInfo
          sx={{
            color: theme.palette.interaction.inactive,
          }}
        />
      ),
    };

    const backgroundColor: {
      [key in Exclude<SectionMessageProps['variant'], undefined>]: string;
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
          <PortalOrFragment disablePortal={disablePortal} container={container}>
            <Box
              wds-ignore-dismissable-layer="true"
              {...wrapperProps}
              sx={[sectionMessageWrapperStyle, wrapperProps?.sx]}
              style={
                {
                  ...wrapperProps?.style,
                  '--wds-region-viewport-top': `calc(env(safe-area-inset-bottom, 0px) + ${config.viewportTop})`,
                  '--wds-region-viewport-max-width': `calc(${config.viewportMaxWidth})`,
                  '--wds-region-top-item-background': backgroundColor[variant],
                } as CSSProperties
              }
            >
              <Box
                ref={ref}
                aria-atomic
                role={variant === 'error' ? 'alert' : 'status'}
                aria-live={variant === 'error' ? 'assertive' : 'polite'}
                aria-describedby={descriptionId}
                {...props}
                sx={[topRegionStatusStyle, props.sx]}
              >
                <FlexBox
                  gap="10px"
                  alignItems="center"
                  sx={{ ['& svg']: { flexShrink: 0 } }}
                >
                  {iconComponent[variant]}

                  <Typography
                    color="palette.label.normal"
                    variant="label1"
                    weight="medium"
                    id={descriptionId}
                  >
                    {children}
                  </Typography>
                </FlexBox>

                {closeIcon && (
                  <FlexBox alignItems="center" flexShrink={0}>
                    <IconButton
                      color="palette.label.alternative"
                      interactionColor="palette.label.alternative"
                      onClick={handleShowToggle}
                      size={20}
                      sx={{ fontSize: '20px' }}
                    >
                      <IconClose />
                    </IconButton>
                  </FlexBox>
                )}
              </Box>
            </Box>
          </PortalOrFragment>
        )}
      </>
    );
  },
);

SectionMessage.displayName = 'SectionMessage';

export default SectionMessage;
