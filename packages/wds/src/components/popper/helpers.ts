import type {
  Alignment,
  Middleware,
  Placement,
  Side,
} from '@floating-ui/react';
import type { PopperContentProps } from './types';

export const getPlacementMapper = (
  placement: Required<PopperContentProps>['placement'],
): Placement => {
  switch (placement) {
    case '1':
      return 'bottom-end';
    case '2':
      return 'left-start';
    case '3':
      return 'left';
    case '4':
      return 'left-end';
    case '5':
      return 'top-start';
    case '6':
      return 'top';
    case '7':
      return 'top-end';
    case '8':
      return 'right-end';
    case '9':
      return 'right';
    case '10':
      return 'right-start';
    case '11':
      return 'bottom-start';
    case '12':
      return 'bottom';
  }
};

export const getSideAlignFromPlacement = (placement: Placement) => {
  const [placedSide, placedAlign = 'center'] = placement.split('-');

  return [placedSide as Side, placedAlign as Alignment | 'center'] as const;
};

export const transformOrigin = (options: {
  arrowWidth: number;
  arrowHeight: number;
}): Middleware => ({
  name: 'transformOrigin',
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;

    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;

    const [placedSide, placedAlign] = getSideAlignFromPlacement(placement);
    const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[
      placedAlign
    ];

    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;

    let x = '';
    let y = '';

    switch (placedSide) {
      case 'bottom':
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
        break;
      case 'top':
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
        break;
      case 'right':
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        break;
      case 'left':
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
        break;
    }

    return { data: { x, y } };
  },
});
