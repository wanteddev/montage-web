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
        d="M2.58094 11.0806C2.07326 11.5883 2.07326 12.4114 2.58094 12.9191L9.5809 19.9191C10.0886 20.4267 10.9117 20.4267 11.4194 19.9191C11.9271 19.4114 11.9271 18.5883 11.4194 18.0806L6.63864 13.2999H20.5001C21.2181 13.2999 21.8001 12.7178 21.8001 11.9999C21.8001 11.2819 21.2181 10.6999 20.5001 10.6999L6.63864 10.6999L11.4194 5.91914C11.9271 5.41146 11.9271 4.58835 11.4194 4.08067C10.9117 3.57299 10.0886 3.57299 9.5809 4.08067L2.58094 11.0806Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeftThick;
