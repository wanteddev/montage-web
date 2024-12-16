import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.86357 11.3635C2.5121 11.7149 2.5121 12.2848 2.86357 12.6363L9.86354 19.6362C10.215 19.9877 10.7849 19.9877 11.1363 19.6362C11.4878 19.2848 11.4878 18.7149 11.1363 18.3634L5.67275 12.8999H20.4999C20.997 12.8999 21.3999 12.4969 21.3999 11.9999C21.3999 11.5028 20.997 11.0999 20.4999 11.0999L5.67275 11.0999L11.1363 5.63628C11.4878 5.28481 11.4878 4.71496 11.1363 4.36349C10.7849 4.01202 10.215 4.01202 9.86354 4.36349L2.86357 11.3635Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeft;
