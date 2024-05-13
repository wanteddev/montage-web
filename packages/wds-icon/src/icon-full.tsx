import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFull = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.3387 9.88965C13.0016 10.2549 13.0243 10.8243 13.3896 11.1614C13.7548 11.4986 14.3242 11.4758 14.6614 11.1106L19.1 6.30198V10.0001C19.1 10.4972 19.503 10.9001 20 10.9001C20.4971 10.9001 20.9 10.4972 20.9 10.0001V4.0001C20.9 3.50304 20.4971 3.1001 20 3.1001H14.5C14.003 3.1001 13.6 3.50304 13.6 4.0001C13.6 4.49715 14.003 4.9001 14.5 4.9001L17.9444 4.9001L13.3387 9.88965Z"
        fill="currentColor"
      />
      <path
        d="M4.90004 14.0001C4.90004 13.503 4.49709 13.1001 4.00004 13.1001C3.50298 13.1001 3.10004 13.503 3.10004 14.0001V20.0001C3.10004 20.4972 3.50298 20.9001 4.00004 20.9001H9.50004C9.99709 20.9001 10.4 20.4972 10.4 20.0001C10.4 19.503 9.99709 19.1001 9.50004 19.1001H6.17283L10.6364 14.6365C10.9879 14.285 10.9879 13.7152 10.6364 13.3637C10.285 13.0122 9.71511 13.0122 9.36364 13.3637L4.90004 17.8273V14.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFull;
