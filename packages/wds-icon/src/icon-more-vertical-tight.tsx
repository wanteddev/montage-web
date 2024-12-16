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
        d="M7.74965 18.75C7.74965 17.7835 6.96615 17 5.99965 17C5.03315 17 4.24965 17.7835 4.24965 18.75C4.24965 19.7164 5.03315 20.4999 5.99965 20.4999C6.96615 20.4999 7.74965 19.7164 7.74965 18.75Z"
        fill="currentColor"
      />
      <path
        d="M5.99965 10.25C6.96615 10.25 7.74965 11.0335 7.74965 12C7.74965 12.9665 6.96615 13.75 5.99965 13.75C5.03315 13.75 4.24965 12.9665 4.24965 12C4.24965 11.0335 5.03315 10.25 5.99965 10.25Z"
        fill="currentColor"
      />
      <path
        d="M5.99965 3.49999C6.96615 3.49999 7.74965 4.28349 7.74965 5.24999C7.74965 6.21648 6.96615 6.99998 5.99965 6.99998C5.03315 6.99998 4.24965 6.21648 4.24965 5.24999C4.24965 4.28349 5.03315 3.49999 5.99965 3.49999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVerticalTight;
