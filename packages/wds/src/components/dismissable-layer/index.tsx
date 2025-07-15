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
        for (const element of Array.from(
          document.querySelectorAll('[wds-ignore-dismissable-layer="true"]'),
        )) {
          const target = e.target as HTMLElement;

          if (element.contains(target)) {
            e.preventDefault();
            break;
          }
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
