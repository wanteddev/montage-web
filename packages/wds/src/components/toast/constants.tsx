import {
  IconCircleCheckFill,
  IconCircleCloseFill,
  IconTriangleExclamationFill,
} from '@wanteddev/wds-icon';

import { FlexBox } from '../flex-box';

import { toastCircleIconWrapperStyle } from './style';

import type { RegionToastItem } from '../../stores/region-store';
import type { ReactNode } from 'react';

export const toastIconComponent: {
  [key in Exclude<RegionToastItem['variant'], undefined>]: ReactNode;
} = {
  normal: null,
  positive: (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      sx={toastCircleIconWrapperStyle}
    >
      <IconCircleCheckFill
        aria-label="positive"
        sx={(theme) => ({
          color: theme.atomic.green[60],
        })}
      />
    </FlexBox>
  ),
  cautionary: (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      sx={toastCircleIconWrapperStyle}
    >
      <IconTriangleExclamationFill
        aria-label="cautionary"
        sx={(theme) => ({
          color: theme.atomic.orange[60],
        })}
      />
    </FlexBox>
  ),
  negative: (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      sx={toastCircleIconWrapperStyle}
    >
      <IconCircleCloseFill
        aria-label="negative"
        sx={(theme) => ({
          color: theme.atomic.red[60],
        })}
      />
    </FlexBox>
  ),
};

export const TOAST_NAME = 'Toast';
export const TOAST_CONTAINER_NAME = 'ToastContainer';
export const TOAST_CONTENT_NAME = 'ToastContent';
export const TOAST_ICON_NAME = 'ToastIcon';
