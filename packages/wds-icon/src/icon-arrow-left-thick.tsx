import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.58089 11.0806C2.07321 11.5883 2.07321 12.4114 2.58089 12.9191L9.58086 19.9191C10.0885 20.4268 10.9116 20.4268 11.4193 19.9191C11.927 19.4114 11.927 18.5883 11.4193 18.0806L6.63859 13.2999H20.5001C21.218 13.2999 21.8 12.7178 21.8 11.9999C21.8 11.2819 21.218 10.6999 20.5001 10.6999L6.63859 10.6999L11.4193 5.91914C11.927 5.41146 11.927 4.58835 11.4193 4.08067C10.9116 3.57299 10.0885 3.57299 9.58086 4.08067L2.58089 11.0806Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
