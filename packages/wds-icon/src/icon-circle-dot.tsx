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
        d="M8.09998 11.9995C8.09998 9.84558 9.84606 8.09949 12 8.09949C14.1539 8.09949 15.9 9.84558 15.9 11.9995C15.9 14.1534 14.1539 15.8995 12 15.8995C9.84606 15.8995 8.09998 14.1534 8.09998 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09997 11.9996C2.09997 6.53197 6.53234 2.0996 11.9999 2.0996C17.4675 2.0996 21.8999 6.53197 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.53234 21.8996 2.09997 17.4672 2.09997 11.9996ZM11.9999 3.8996C7.52645 3.8996 3.89997 7.52608 3.89997 11.9996C3.89997 16.4731 7.52645 20.0996 11.9999 20.0996C16.4734 20.0996 20.0999 16.4731 20.0999 11.9996C20.0999 7.52608 16.4734 3.8996 11.9999 3.8996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleDot;
