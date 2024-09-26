import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoreVerticalTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M7.74964 18.75C7.74964 17.7835 6.96613 17 5.99964 17C5.03314 17 4.24963 17.7835 4.24963 18.75C4.24963 19.7165 5.03314 20.5 5.99964 20.5C6.96613 20.5 7.74964 19.7165 7.74964 18.75Z"
        fill="currentColor"
      />
      <path
        d="M5.99964 10.25C6.96613 10.25 7.74964 11.0335 7.74964 12C7.74964 12.9665 6.96613 13.75 5.99964 13.75C5.03314 13.75 4.24963 12.9665 4.24963 12C4.24963 11.0335 5.03314 10.25 5.99964 10.25Z"
        fill="currentColor"
      />
      <path
        d="M5.99964 3.5C6.96613 3.5 7.74964 4.2835 7.74964 5.25C7.74964 6.2165 6.96613 7 5.99964 7C5.03314 7 4.24963 6.2165 4.24963 5.25C4.24963 4.2835 5.03314 3.5 5.99964 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVerticalTight;
