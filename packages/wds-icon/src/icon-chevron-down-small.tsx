import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDownSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36331 8.36366C4.71478 8.01219 5.28463 8.01219 5.6361 8.36366L11.9997 14.7272L18.3632 8.36366C18.7147 8.01219 19.2846 8.01219 19.636 8.36366C19.9875 8.71513 19.9875 9.28497 19.636 9.63644L12.6361 16.6364C12.2846 16.9879 11.7147 16.9879 11.3633 16.6364L4.36331 9.63644C4.01184 9.28497 4.01184 8.71513 4.36331 8.36366Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
