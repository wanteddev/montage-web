import { Box } from '@wanteddev/wds-engine';
import { memo, useId } from 'react';

import { FlexBox, Portal, TextButton } from '..';
import { useRegionStore } from '../../stores/region-store';
import { ellipsisTypographyStyle } from '../../utils';
import Typography from '../typography';

import { isSnackbar } from './helpers';
import {
  bottomRegionStatusStyle,
  firstOverlayStyle,
  fullWidthFlexBoxStyle,
  messageStyle,
  secondOverlayStyle,
  snackbarActionStyle,
  textStyle,
} from './style';
import { useRegionStatusAnimation } from './hooks';
import { toastIconComponent } from './constants';

import type {
  RegionSnackbarItem,
  RegionToastItem,
  WithRegionSystem,
} from '../../stores/region-store';

const RegionStatus = () => {
  const items = useRegionStore((state) => state.items);

  return (
    <>
      {items.map((item) => (
        <Portal
          key={item.id}
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          container={globalThis?.document?.querySelector(
            '#wds-region-manager-bottom',
          )}
        >
          {isSnackbar(item) ? <Snackbar {...item} /> : <Toast {...item} />}
        </Portal>
      ))}
    </>
  );
};

const Toast = ({
  id,
  duration,
  variant = 'normal',
  icon,
  content,
  onAnimationEnd,
  height,
  createdAt,
  pausedAt,
  status,
}: WithRegionSystem<RegionToastItem>) => {
  const contentId = useId();

  const { ref, containerStyle, handlers } = useRegionStatusAnimation({
    id,
    duration,
    status,
    height,
    pausedAt,
    createdAt,
    onAnimationEnd,
  });

  return (
    <Box style={containerStyle} {...handlers}>
      <Box
        ref={ref}
        aria-atomic
        role={variant === 'negative' ? 'alert' : 'status'}
        aria-live={variant === 'negative' ? 'assertive' : 'polite'}
        sx={bottomRegionStatusStyle}
        aria-describedby={contentId}
      >
        <Box role="presentation" sx={firstOverlayStyle} />
        <Box role="presentation" sx={secondOverlayStyle} />
        <FlexBox
          gap="8px"
          alignItems="center"
          sx={{ ['& svg']: { flexShrink: 0 } }}
        >
          {toastIconComponent[variant] ?? icon}

          <Typography
            color="semantic.static.white"
            variant="body2"
            weight="bold"
            id={contentId}
            sx={[messageStyle, textStyle]}
          >
            {content}
          </Typography>
        </FlexBox>
      </Box>
    </Box>
  );
};

const Snackbar = ({
  id,
  duration,
  title,
  description,
  extraContent,
  action,
  onAnimationEnd,
  height,
  createdAt,
  pausedAt,
  status,
}: WithRegionSystem<RegionSnackbarItem>) => {
  const titleId = useId();
  const descriptionId = useId();

  const { ref, containerStyle, handlers } = useRegionStatusAnimation({
    id,
    duration,
    status,
    height,
    pausedAt,
    createdAt,
    onAnimationEnd,
  });

  return (
    <Box style={containerStyle} {...handlers}>
      <Box
        ref={ref}
        aria-atomic
        role="status"
        aria-live="polite"
        sx={bottomRegionStatusStyle}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <Box role="presentation" sx={firstOverlayStyle} />
        <Box role="presentation" sx={secondOverlayStyle} />
        <FlexBox
          gap="12px"
          alignItems="center"
          justifyContent="space-between"
          sx={fullWidthFlexBoxStyle}
        >
          <FlexBox gap="12px" alignItems="center">
            {extraContent && (
              <FlexBox
                flexShrink={0}
                sx={{ width: 'fit-content', height: 'fit-content' }}
              >
                {extraContent}
              </FlexBox>
            )}

            <FlexBox flexDirection="column" sx={messageStyle}>
              {title && (
                <Typography
                  color="semantic.static.white"
                  variant="body2"
                  weight="bold"
                  id={titleId}
                  sx={textStyle}
                >
                  {title}
                </Typography>
              )}

              {description && (
                <Typography
                  color="semantic.static.white"
                  variant="label2"
                  weight="regular"
                  id={descriptionId}
                  sx={[textStyle, ellipsisTypographyStyle(2)]}
                >
                  {description}
                </Typography>
              )}
            </FlexBox>
          </FlexBox>

          <TextButton
            variant="assistive"
            size="medium"
            {...action}
            sx={[snackbarActionStyle, action.sx]}
          />
        </FlexBox>
      </Box>
    </Box>
  );
};

export default memo(RegionStatus);
