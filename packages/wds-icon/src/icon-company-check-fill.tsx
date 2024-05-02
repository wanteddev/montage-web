import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCompanyCheckFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8366 4.00619L22.5638 2.7334L19.6002 5.697L18.0366 4.1334L16.7638 5.40619L19.6002 8.24259L23.8366 4.00619Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.44933 2.09961C5.02194 2.09955 4.61597 2.09948 4.28291 2.14426C3.9108 2.19429 3.49814 2.31458 3.1566 2.65612C2.81507 2.99766 2.69477 3.41031 2.64475 3.78242C2.59997 4.11548 2.60003 4.52145 2.6001 4.94885L2.60011 21.8996H14.6001V16.9996H16.4001V21.8994H21.4001L21.4001 12.9486C21.4002 12.5212 21.4003 12.1153 21.3555 11.7822C21.3054 11.4101 21.1852 10.9975 20.8436 10.6559C20.5021 10.3144 20.0894 10.1941 19.7173 10.1441C19.3843 10.0993 18.9783 10.0993 18.5509 10.0994L15.4001 10.0994L15.4001 4.94883C15.4002 4.52144 15.4002 4.11548 15.3554 3.78242C15.3054 3.41031 15.1851 2.99766 14.8436 2.65612C14.502 2.31458 14.0894 2.19429 13.7173 2.14426C13.3842 2.09948 12.9782 2.09955 12.5509 2.09961H5.44933ZM11.5001 11.8996H6.50008V10.0996H11.5001V11.8996ZM11.5001 7.8996H6.50008V6.0996H11.5001V7.8996Z"
      />
    </Box>
  );
});

export default IconCompanyCheckFill;
