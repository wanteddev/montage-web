import type { CSSProperties } from 'react';

export const isNotPointerDevice = () =>
  window.matchMedia('(pointer: coarse)').matches;

export const makeTransitionStyle = ({
  open,
  height,
  disablePortal,
}: {
  height?: number;
  open?: boolean;
  disablePortal?: boolean;
}): CSSProperties => {
  if (open && Boolean(height)) {
    return {
      height,
      marginTop: disablePortal ? 0 : '10px',
      opacity: 1,
    };
  } else {
    return {
      height: 0,
      margin: 0,
      opacity: 0,
    };
  }
};
