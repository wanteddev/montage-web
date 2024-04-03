'use client';
import { memo, useId, useRef, useState } from 'react';
import {
  IconCircleCheck,
  IconCircleExclamation,
  IconCircleInfo,
  IconClose,
  IconLink,
} from '@wanteddev/wds-icon';

import { useRegionStore } from '../../stores/region-store';
import Typography from '../typography';
import IconButton from '../icon-button';
import { FlexBox, Portal, TextButton } from '..';

import {
  bottomMountKeyFrames,
  bottomRegionStatusStyle,
  bottomUnmountKeyFrames,
} from './style';

import type { AnimationEventHandler, ReactNode } from 'react';
import type { RegionItem, RegionSnackbarItem } from '../../stores/region-store';

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
          <BottomItem {...item} />
        </Portal>
      ))}
    </>
  );
};

const BottomItem = ({
  id,
  variant = 'normal',
  duration = 5000,
  ...props
}: RegionItem) => {
  const hide = useRegionStore((state) => state.hide);
  const descriptionId = useId();

  const ref = useRef<HTMLDivElement>(null);
  const [isMountAnimationDone, setIsMountAnimationDone] = useState(false);

  const iconComponent: {
    [key in Exclude<RegionItem['variant'], undefined>]: ReactNode;
  } = {
    normal: null,
    success: (
      <IconCircleCheck
        css={(theme) => ({
          color: theme.palette.status.positive,
        })}
      />
    ),
    error: (
      <IconCircleExclamation
        css={(theme) => ({
          color: theme.palette.status.negative,
        })}
      />
    ),
    info: (
      <IconCircleInfo
        css={(theme) => ({
          color: theme.palette.interaction.inactive,
        })}
      />
    ),
    link: (
      <IconLink
        css={(theme) => ({
          color: theme.palette.status.positive,
        })}
      />
    ),
  };

  const isSnackbar = (item: RegionItem): item is RegionSnackbarItem =>
    item.type === 'snackbar';

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    if (e.animationName === bottomMountKeyFrames.name) {
      setIsMountAnimationDone(true);
    } else if (e.animationName === bottomUnmountKeyFrames.name) {
      hide(id);
    }
  };

  return (
    <div
      ref={ref}
      aria-atomic
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      css={bottomRegionStatusStyle(duration, isMountAnimationDone)}
      onAnimationEnd={handleAnimationEnd}
      aria-describedby={descriptionId}
    >
      <FlexBox
        gap="10px"
        alignItems="center"
        css={{ ['& svg']: { flexShrink: 0 } }}
      >
        {iconComponent[variant]}

        <Typography
          color="palette.inverse.label"
          variant="label1_normal"
          weight="medium"
          id={descriptionId}
        >
          {props.content}
        </Typography>
      </FlexBox>

      <FlexBox gap="20px" alignItems="center" flexShrink={0}>
        {isSnackbar(props) && Boolean(props.action) && (
          <TextButton
            size="small"
            {...props.action}
            css={[
              (theme) => ({
                margin: '-4px -6px',
                ['& > span']: {
                  color: theme.palette.inverse.primary,
                },
                ['&:disabled > span']: {
                  color: theme.palette.label.disable,
                },
                ["& > [wds-component='with-interaction']"]: {
                  backgroundColor: theme.palette.inverse.primary,
                },
              }),
              props.action?.css,
            ]}
          />
        )}

        {isSnackbar(props) && props.showCloseIcon && (
          <IconButton
            color="palette.inverse.label"
            interactionColor="palette.inverse.label"
            onClick={() => hide(id)}
            size={20}
            css={{ fontSize: '20px' }}
          >
            <IconClose />
          </IconButton>
        )}
      </FlexBox>
    </div>
  );
};

export default memo(RegionStatus);
