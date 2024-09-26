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
        d="M3.36379 7.36338C3.71526 7.01191 4.2851 7.01191 4.63657 7.36338L12.0001 14.7269L19.3636 7.36338C19.7151 7.01191 20.2849 7.01191 20.6364 7.36338C20.9879 7.71485 20.9879 8.28469 20.6364 8.63616L12.6365 16.6361C12.285 16.9875 11.7152 16.9875 11.3637 16.6361L3.36379 8.63616C3.01232 8.28469 3.01232 7.71485 3.36379 7.36338Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
