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
  fullWidthFlexBoxStyle,
  messageStyle,
  secondOverlayStyle,
  snackbarActionStyle,
  textStyle,
  toastCircleIconWrapperStyle,
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
  duration = 3000,
  variant = 'normal',
  icon = <IconCircle />,
  content,
  onAnimationEnd,
}: RegionToastItem) => {
  const hide = useRegionStore((state) => state.hide);
  const contentId = useId();

  const [isMountAnimationDone, setIsMountAnimationDone] = useState(false);

  // warning과 success일 때 다크모드 시인성을 위해 흰색 배경 표시
  // CircleIcon을 사용하기 때문.
  const iconComponent: {
    [key in Exclude<RegionToastItem['variant'], undefined>]: ReactNode;
  } = {
    normal: null,
    success: (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        sx={toastCircleIconWrapperStyle}
      >
        <IconCircleCheckFill
          sx={(theme) => ({
            color: theme.palette.status.positive,
          })}
        />
      </FlexBox>
    ),
    warning: (
      <FlexBox
        alignItems="center"
        justifyContent="center"
        sx={toastCircleIconWrapperStyle}
      >
        <IconCircleExclamationFill
          sx={(theme) => ({
            color: theme.palette.status.cautionary,
          })}
        />
      </FlexBox>
    ),
    custom: icon,
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === bottomMountKeyFrames.name) {
      setIsMountAnimationDone(true);
      onAnimationEnd?.('show');
    } else if (e.animationName === bottomUnmountKeyFrames.name) {
      hide(id);
      onAnimationEnd?.('hide');
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
          variant="body2"
          weight="bold"
          id={contentId}
          sx={[messageStyle, textStyle]}
        >
          {content}
        </Typography>
      </FlexBox>
    </Box>
  );
};

const Snackbar = ({
  id,
  duration = 5000,
  title,
  description,
  extraContent,
  action,
  onAnimationEnd,
}: RegionSnackbarItem) => {
  const hide = useRegionStore((state) => state.hide);
  const titleId = useId();
  const descriptionId = useId();

  const [isMountAnimationDone, setIsMountAnimationDone] = useState(false);

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === bottomMountKeyFrames.name) {
      setIsMountAnimationDone(true);
      onAnimationEnd?.('show');
    } else if (e.animationName === bottomUnmountKeyFrames.name) {
      hide(id);
      onAnimationEnd?.('hide');
    }
  };

  return (
    <Box
      aria-atomic
      role="status"
      aria-live="polite"
      sx={bottomRegionStatusStyle(duration, isMountAnimationDone)}
      onAnimationEnd={handleAnimationEnd}
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
                color="palette.static.white"
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
