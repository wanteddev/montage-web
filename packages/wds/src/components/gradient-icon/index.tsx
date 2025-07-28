import { useId, useState } from 'react';
import { Box } from '@wanteddev/wds-engine';
import { Slot } from '@radix-ui/react-slot';

import { hasGradient, transformGradientCoordinates } from './helpers';
import { DEFAULT_VIEW_BOX } from './constants';
import { gradientIconStyle, gradientSvgStyle } from './style';

import type { GradientIconProps } from './types';
import type { RefObject } from 'react';

const GradientIcon = ({
  children,
  gradient,
  gradientViewBox,
  defaultViewBox: givenDefaultViewBox = DEFAULT_VIEW_BOX,
}: GradientIconProps) => {
  const id = useId();

  const [node, setNode] = useState<SVGSVGElement | null>(null);

  const defaultViewBox = node ? node.viewBox.baseVal : givenDefaultViewBox;

  const transformedGradient = hasGradient(gradient)
    ? transformGradientCoordinates({
        gradient,
        gradientViewBox,
        defaultViewBox,
      })
    : null;

  return (
    <>
      {transformedGradient && (
        <Box as="svg" aria-hidden sx={gradientSvgStyle}>
          <defs>
            <Slot id={id}>{transformedGradient}</Slot>
          </defs>
        </Box>
      )}

      <Box
        as={Slot}
        ref={setNode as unknown as RefObject<HTMLElement>}
        sx={hasGradient(gradient) ? gradientIconStyle(id) : undefined}
      >
        {children}
      </Box>
    </>
  );
};

GradientIcon.displayName = 'GradientIcon';

export { GradientIcon };

export type { GradientIconProps };
