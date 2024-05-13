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
        d="M2.86352 11.364C2.51205 11.7155 2.51205 12.2853 2.86352 12.6368L9.86351 19.6368C10.215 19.9883 10.7848 19.9883 11.1363 19.6368C11.4878 19.2853 11.4878 18.7155 11.1363 18.364L5.67271 12.9004H20.4999C20.997 12.9004 21.3999 12.4974 21.3999 12.0004C21.3999 11.5033 20.997 11.1004 20.4999 11.1004L5.67271 11.1004L11.1363 5.63679C11.4878 5.28531 11.4878 4.71547 11.1363 4.36399C10.7848 4.01252 10.215 4.01252 9.86351 4.36399L2.86352 11.364Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowLeft;
