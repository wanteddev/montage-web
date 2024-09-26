import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08094 16.4191C3.58862 16.9268 4.41173 16.9268 4.91941 16.4191L12.0001 9.33838L19.0808 16.4191C19.5885 16.9268 20.4116 16.9268 20.9193 16.4191C21.427 15.9114 21.427 15.0883 20.9193 14.5806L12.9194 6.58068C12.4117 6.073 11.5886 6.073 11.0809 6.58068L3.08094 14.5806C2.57326 15.0883 2.57326 15.9114 3.08094 16.4191Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpThick;
