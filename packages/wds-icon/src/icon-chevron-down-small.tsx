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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        d="M4.36334 8.36321C4.71481 8.01174 5.28466 8.01174 5.63613 8.36321L11.9997 14.7268L18.3633 8.36321C18.7148 8.01174 19.2847 8.01174 19.6361 8.36321C19.9876 8.71469 19.9876 9.28453 19.6361 9.63601L12.6361 16.636C12.2847 16.9875 11.7148 16.9875 11.3633 16.636L4.36334 9.63601C4.01186 9.28453 4.01186 8.71469 4.36334 8.36321Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
