import { Children, cloneElement, isValidElement } from 'react';

import { DEFAULT_VIEW_BOX } from './constants';

import type { GradientIconProps, NonNullableGradientIconProps } from './types';

export const hasGradient = (
  gradient: GradientIconProps['gradient'],
): gradient is NonNullable<GradientIconProps['gradient']> => Boolean(gradient);

const getViewBox = (
  viewBox: GradientIconProps['gradientViewBox'] = DEFAULT_VIEW_BOX,
) => {
  if (typeof viewBox === 'string') {
    const [, , width, height] = viewBox.split(' ');

    return { width: Number(width), height: Number(height) };
  }

  if ('baseVal' in viewBox) {
    return {
      width: Number(viewBox.baseVal.width),
      height: Number(viewBox.baseVal.height),
    };
  }

  return { width: viewBox.width, height: viewBox.height };
};

export const transformGradientCoordinates = ({
  gradient,
  gradientViewBox,
  defaultViewBox,
}: NonNullableGradientIconProps) => {
  if (!isValidElement(gradient)) return null;

  if (Children.count(gradient) > 1) {
    throw new Error('GradientIcon does not support multiple children');
  }

  const { x1, y1, x2, y2, ...rest } = gradient.props;

  const scaleX =
    getViewBox(defaultViewBox).width / getViewBox(gradientViewBox).width;
  const scaleY =
    getViewBox(defaultViewBox).height / getViewBox(gradientViewBox).height;

  const transformedProps = {
    ...rest,
    x1: x1 ? parseFloat(String(x1)) * scaleX : x1,
    y1: y1 ? parseFloat(String(y1)) * scaleY : y1,
    x2: x2 ? parseFloat(String(x2)) * scaleX : x2,
    y2: y2 ? parseFloat(String(y2)) * scaleY : y2,
  };

  return cloneElement(gradient, transformedProps);
};
