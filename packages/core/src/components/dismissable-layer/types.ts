import type { DismissableLayerProps as RadixDismissableLayerProps } from '@radix-ui/react-dismissable-layer';

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;

export type DismissableLayerProps = RadixDismissableLayerProps;
