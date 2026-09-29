import type { IconButtonProps } from '../icon-button';
import type { TooltipContentProps } from './types';

type TooltipSize = NonNullable<TooltipContentProps['size']>;

// Close button icon per tooltip size: medium uses the `small` preset (16px icon),
// small has no named size with a 10px icon, so it passes the number.
export const closeButtonSize = (size: TooltipSize): IconButtonProps['size'] =>
  size === 'small' ? 10 : 'small';

export const closeButtonResponsiveSize = (
  value: { size?: TooltipSize } | undefined,
): { size: IconButtonProps['size'] } | undefined =>
  value?.size ? { size: closeButtonSize(value.size) } : undefined;
