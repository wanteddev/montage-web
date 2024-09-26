import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMinusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.70006 11.9989C2.70006 11.2809 3.28209 10.6989 4.00005 10.6989H20C20.7179 10.6989 21.3 11.2809 21.3 11.9989C21.3 12.7169 20.7179 13.2989 20 13.2989H4.00005C3.28209 13.2989 2.70006 12.7169 2.70006 11.9989Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMinusThick;
