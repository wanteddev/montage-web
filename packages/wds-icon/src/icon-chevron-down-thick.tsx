import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08083 7.58071C3.58852 7.07303 4.41163 7.07303 4.91931 7.58071L12.0001 14.6615L19.0808 7.58071C19.5885 7.07303 20.4116 7.07303 20.9193 7.58071C21.427 8.08839 21.427 8.91151 20.9193 9.41919L12.9193 17.4192C12.4116 17.9269 11.5885 17.9269 11.0808 17.4192L3.08083 9.41919C2.57315 8.91151 2.57315 8.08839 3.08083 7.58071Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownThick;
