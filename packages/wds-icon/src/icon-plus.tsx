import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9998 3.10301C12.4968 3.10301 12.8998 3.50595 12.8998 4.00301V11.103H19.9998C20.4968 11.103 20.8997 11.5059 20.8997 12.003C20.8997 12.5 20.4968 12.903 19.9998 12.903H12.8998V20.0029C12.8998 20.5 12.4968 20.9029 11.9998 20.9029C11.5027 20.9029 11.0998 20.5 11.0998 20.0029V12.903H3.99983C3.50278 12.903 3.09984 12.5 3.09984 12.003C3.09984 11.5059 3.50278 11.103 3.99983 11.103H11.0998V4.00301C11.0998 3.50595 11.5027 3.10301 11.9998 3.10301Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlus;
