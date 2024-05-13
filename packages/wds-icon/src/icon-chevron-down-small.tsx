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
        d="M4.36334 8.3637C4.71481 8.01223 5.28466 8.01223 5.63613 8.3637L11.9997 14.7273L18.3633 8.3637C18.7148 8.01223 19.2847 8.01223 19.6361 8.3637C19.9876 8.71517 19.9876 9.28502 19.6361 9.63649L12.6361 16.6365C12.2847 16.988 11.7148 16.988 11.3633 16.6365L4.36334 9.63649C4.01186 9.28502 4.01186 8.71517 4.36334 8.3637Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
