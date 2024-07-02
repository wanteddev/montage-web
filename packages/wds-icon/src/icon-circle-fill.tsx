import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09996 12C2.09996 6.53245 6.53232 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53245 21.8999 12C21.8999 17.4676 17.4675 21.9 11.9999 21.9C6.53232 21.9 2.09996 17.4676 2.09996 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleFill;
