import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36331 15.6364C4.71478 15.9879 5.28463 15.9879 5.6361 15.6364L11.9997 9.27284L18.3632 15.6364C18.7147 15.9879 19.2846 15.9879 19.636 15.6364C19.9875 15.2849 19.9875 14.7151 19.636 14.3636L12.6361 7.36366C12.2846 7.01219 11.7147 7.01219 11.3633 7.36366L4.36331 14.3636C4.01184 14.7151 4.01184 15.2849 4.36331 15.6364Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
