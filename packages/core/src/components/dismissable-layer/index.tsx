import { composeEventHandlers } from '@radix-ui/primitive';
import { DismissableLayer as RadixDismissableLayer } from '@radix-ui/react-dismissable-layer';
import { forwardRef, useCallback } from 'react';

import type {
  DismissableLayerProps,
  FocusOutsideEvent,
  PointerDownOutsideEvent,
} from './types';

const DismissableLayer = forwardRef<HTMLDivElement, DismissableLayerProps>(
  (
    { onInteractOutside, onFocusOutside, onPointerDownOutside, ...props },
    ref,
  ) => {
    const handleSkipDismissableLayer = useCallback(
      (e: PointerDownOutsideEvent | FocusOutsideEvent) => {
        const target = e.target as HTMLElement;

        if (target.closest('[wds-ignore-dismissable-layer="true"]')) {
          e.preventDefault();
        }
      },
      [],
    );

    return (
      <RadixDismissableLayer
        ref={ref}
        onPointerDownOutside={composeEventHandlers((e) => {
          handleSkipDismissableLayer(e);
        }, onPointerDownOutside)}
        onFocusOutside={composeEventHandlers((e) => {
          handleSkipDismissableLayer(e);
        }, onFocusOutside)}
        onInteractOutside={composeEventHandlers((e) => {
          handleSkipDismissableLayer(e);
        }, onInteractOutside)}
        {...props}
      />
    );
  },
);

DismissableLayer.displayName = 'DismissableLayer';

export { DismissableLayer };

export type { DismissableLayerProps };
