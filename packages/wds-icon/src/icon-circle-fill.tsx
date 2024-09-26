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
        d="M2.09996 11.9999C2.09996 6.53232 6.53232 2.09996 11.9999 2.09996C17.4675 2.09996 21.8999 6.53232 21.8999 11.9999C21.8999 17.4675 17.4675 21.8999 11.9999 21.8999C6.53232 21.8999 2.09996 17.4675 2.09996 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleFill;
