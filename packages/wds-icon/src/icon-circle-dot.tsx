import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleDot = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.09996 11.9995C8.09996 9.84555 9.84604 8.09947 11.9999 8.09947C14.1538 8.09947 15.8999 9.84555 15.8999 11.9995C15.8999 14.1534 14.1538 15.8994 11.9999 15.8994C9.84604 15.8994 8.09996 14.1534 8.09996 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09996 11.9995C2.09996 6.53196 6.53232 2.0996 11.9999 2.0996C17.4675 2.0996 21.8999 6.53196 21.8999 11.9995C21.8999 17.4671 17.4675 21.8995 11.9999 21.8995C6.53232 21.8995 2.09996 17.4671 2.09996 11.9995ZM11.9999 3.89959C7.52643 3.89959 3.89996 7.52606 3.89996 11.9995C3.89996 16.473 7.52643 20.0995 11.9999 20.0995C16.4734 20.0995 20.0999 16.473 20.0999 11.9995C20.0999 7.52606 16.4734 3.89959 11.9999 3.89959Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleDot;
