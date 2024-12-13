import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M3.36383 7.3634C3.7153 7.01193 4.28514 7.01193 4.63661 7.3634L12.0002 14.7269L19.3637 7.3634C19.7152 7.01193 20.285 7.01193 20.6365 7.3634C20.9879 7.71487 20.9879 8.28471 20.6365 8.63618L12.6365 16.6361C12.2851 16.9876 11.7152 16.9876 11.3638 16.6361L3.36383 8.63618C3.01236 8.28471 3.01236 7.71487 3.36383 7.3634Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
