import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPinFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.10019 4.39962H6.00019V2.59962H8.99544L9.00019 2.59961H15.0002L15.0049 2.59962H18.0002V4.39962H15.9002V10.1271L19.2204 14.56C19.4247 14.8328 19.4575 15.1975 19.305 15.5023C19.1525 15.8071 18.8409 15.9995 18.5001 15.9995H12.9003V21.9996L12.0003 22.9996L11.1003 21.9996V15.9995H5.5001C5.15931 15.9995 4.84774 15.8071 4.69524 15.5023C4.54274 15.1975 4.57546 14.8327 4.77977 14.56L8.10019 10.1271V4.39962Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPinFill;
