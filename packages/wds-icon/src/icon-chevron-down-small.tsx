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
        d="M4.36335 8.36367C4.71482 8.0122 5.28467 8.0122 5.63614 8.36367L11.9997 14.7272L18.3633 8.36367C18.7148 8.0122 19.2846 8.0122 19.6361 8.36367C19.9876 8.71514 19.9876 9.28499 19.6361 9.63646L12.6361 16.6364C12.2846 16.9879 11.7148 16.9879 11.3633 16.6364L4.36335 9.63646C4.01188 9.28499 4.01188 8.71514 4.36335 8.36367Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
