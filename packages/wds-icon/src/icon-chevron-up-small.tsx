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
        d="M4.36331 15.6363C4.71478 15.9878 5.28463 15.9878 5.6361 15.6363L11.9997 9.27272L18.3632 15.6363C18.7147 15.9878 19.2846 15.9878 19.636 15.6363C19.9875 15.2848 19.9875 14.715 19.636 14.3635L12.6361 7.36354C12.2846 7.01207 11.7147 7.01207 11.3633 7.36354L4.36331 14.3635C4.01184 14.715 4.01184 15.2848 4.36331 15.6363Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
