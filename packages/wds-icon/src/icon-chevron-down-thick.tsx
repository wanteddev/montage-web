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
        d="M3.08094 7.58067C3.58862 7.07299 4.41173 7.07299 4.91941 7.58067L12.0001 14.6614L19.0808 7.58067C19.5885 7.07299 20.4116 7.07299 20.9193 7.58067C21.427 8.08835 21.427 8.91146 20.9193 9.41914L12.9194 17.4191C12.4117 17.9268 11.5886 17.9268 11.0809 17.4191L3.08094 9.41914C2.57326 8.91146 2.57326 8.08835 3.08094 7.58067Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownThick;
