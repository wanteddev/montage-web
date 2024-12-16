import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationSocial = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.1125 7.13976C19.1125 9.06716 17.5495 10.6296 15.6214 10.6296C13.6934 10.6296 12.1304 9.06716 12.1304 7.13976C12.1304 5.21235 13.6934 3.64988 15.6214 3.64988C17.5495 3.64988 19.1125 5.21235 19.1125 7.13976Z"
        fill="currentColor"
      />
      <path
        d="M10.6405 8.51277C10.6405 10.2397 9.24007 11.6397 7.51251 11.6397C5.78496 11.6397 4.3845 10.2397 4.3845 8.51277C4.3845 6.78581 5.78496 5.38584 7.51251 5.38584C9.24007 5.38584 10.6405 6.78581 10.6405 8.51277Z"
        fill="currentColor"
      />
      <path
        d="M8.54619 13.2675C8.57412 13.2443 8.60204 13.221 8.62532 13.2024C8.2669 13.1652 7.89452 13.1372 7.50817 13.1372C2.7696 13.1372 0 16.0827 0 18.8746C0 19.7587 0.591158 20.345 1.47091 20.345H6.28396C6.00002 19.8797 5.84176 19.3213 5.84176 18.7024C5.84176 16.6969 6.82392 14.7147 8.54153 13.2629L8.54619 13.2675Z"
        fill="currentColor"
      />
      <path
        d="M10.5103 13.5886C11.8509 12.7975 13.5685 12.2996 15.6212 12.2996V12.3043C20.9091 12.3043 23.9999 15.5848 23.9999 18.7071C23.9999 19.6935 23.3435 20.3496 22.3567 20.3496H8.88577C7.89896 20.3496 7.24263 19.6935 7.24263 18.7071C7.24263 16.7993 8.40167 14.831 10.5103 13.5886Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationSocial;
