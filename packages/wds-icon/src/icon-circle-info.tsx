import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleInfo = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 7.99996C12.9999 8.55224 12.5522 8.99995 11.9999 8.99995C11.4476 8.99995 10.9999 8.55224 10.9999 7.99996C10.9999 7.44768 11.4476 6.99996 11.9999 6.99996C12.5522 6.99996 12.9999 7.44768 12.9999 7.99996Z"
        fill="currentColor"
      />
      <path
        d="M12.9 11.4999C12.9 11.0029 12.4971 10.5999 12 10.5999C11.5029 10.5999 11.1 11.0029 11.1 11.4999V15.9999C11.1 16.497 11.5029 16.8999 12 16.8999C12.4971 16.8999 12.9 16.497 12.9 15.9999V11.4999Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09996 12C2.09996 6.53245 6.53232 2.10009 11.9999 2.10009C17.4675 2.10009 21.8998 6.53245 21.8998 12C21.8998 17.4676 17.4675 21.9 11.9999 21.9C6.53232 21.9 2.09996 17.4676 2.09996 12ZM11.9999 3.90008C7.52643 3.90008 3.89996 7.52655 3.89996 12C3.89996 16.4735 7.52643 20.1 11.9999 20.1C16.4734 20.1 20.0999 16.4735 20.0999 12C20.0999 7.52655 16.4734 3.90008 11.9999 3.90008Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
