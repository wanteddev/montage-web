'use client';
import { Box } from '@wanteddev/wds-engine';
import {
  IconCircle,
  IconCircleCheckFill,
  IconCircleExclamationFill,
} from '@wanteddev/wds-icon';
import { memo, useId, useState } from 'react';

import { FlexBox, Portal, TextButton } from '..';
import { useRegionStore } from '../../stores/region-store';
import { ellipsisTypographyStyle } from '../../utils';
import Typography from '../typography';

import { isSnackbar } from './helpers';
import {
  bottomMountKeyFrames,
  bottomRegionStatusStyle,
  bottomUnmountKeyFrames,
  firstOverlayStyle,
  messageStyle,
  secondOverlayStyle,
  snackbarActionStyle,
  textStyle,
} from './style';

import type { AnimationEventHandler, ReactNode } from 'react';
import type {
  RegionSnackbarItem,
  RegionToastItem,
} from '../../stores/region-store';

/**
 * @description WDS 패키지로 export 되지 않는 요소 입니다.
 * ThemeProvider에 포함되어 있습니다.
 */
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
  duration = 5000,
  variant = 'normal',
  icon = <IconCircle />,
  ...props
}: RegionToastItem) => {
  const hide = useRegionStore((state) => state.hide);
  const contentId = useId();

  const [isMountAnimationDone, setIsMountAnimationDone] = useState(false);

  const iconComponent: {
    [key in Exclude<RegionToastItem['variant'], undefined>]: ReactNode;
  } = {
    normal: null,
    success: (
      <IconCircleCheckFill
        sx={(theme) => ({
          color: theme.palette.status.positive,
        })}
      />
    ),
    warning: (
      <IconCircleExclamationFill
        sx={(theme) => ({
          color: theme.palette.status.cautionary,
        })}
      />
    ),
    custom: icon,
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === bottomMountKeyFrames.name) {
      setIsMountAnimationDone(true);
    } else if (e.animationName === bottomUnmountKeyFrames.name) {
      hide(id);
    }
  };

  return (
    <Box
      aria-atomic
      role={variant === 'warning' ? 'alert' : 'status'}
      aria-live={variant === 'warning' ? 'assertive' : 'polite'}
      sx={bottomRegionStatusStyle(duration, isMountAnimationDone)}
      onAnimationEnd={handleAnimationEnd}
      aria-describedby={contentId}
    >
      <Box role="presentation" sx={firstOverlayStyle} />
      <Box role="presentation" sx={secondOverlayStyle} />
      <FlexBox
        gap="8px"
        alignItems="center"
        sx={{ ['& svg']: { flexShrink: 0 } }}
      >
        {iconComponent[variant]}

        <Typography
          color="palette.static.white"
          variant="body2_normal"
          weight="bold"
          id={contentId}
          sx={[messageStyle, textStyle]}
        >
          {props.content}
        </Typography>
      </FlexBox>
    </Box>
  );
};

const Snackbar = ({
  id,
  duration = 5000,
  heading,
  description,
  extraContent,
  action,
}: RegionSnackbarItem) => {
  const hide = useRegionStore((state) => state.hide);
  const headingId = useId();
  const descriptionId = useId();

  const [isMountAnimationDone, setIsMountAnimationDone] = useState(false);

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === bottomMountKeyFrames.name) {
      setIsMountAnimationDone(true);
    } else if (e.animationName === bottomUnmountKeyFrames.name) {
      hide(id);
    }
  };

  return (
    <Box
      aria-atomic
      role="status"
      aria-live="polite"
      sx={bottomRegionStatusStyle(duration, isMountAnimationDone)}
      onAnimationEnd={handleAnimationEnd}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <Box role="presentation" sx={firstOverlayStyle} />
      <Box role="presentation" sx={secondOverlayStyle} />
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
          {heading && (
            <Typography
              color="palette.static.white"
              variant="body2_normal"
              weight="bold"
              id={headingId}
              sx={textStyle}
            >
              {heading}
            </Typography>
          )}

          {description && (
            <Typography
              color="palette.static.white"
              variant="label2"
              weight="regular"
              id={descriptionId}
              sx={[textStyle, ellipsisTypographyStyle(2)]}
            >
              {description}
            </Typography>
          )}
        </FlexBox>

        <TextButton
          variant="assistive"
          size="medium"
          {...action}
          sx={[snackbarActionStyle, action.sx]}
        />
      </FlexBox>
    </Box>
  );
};

export default memo(RegionStatus);
