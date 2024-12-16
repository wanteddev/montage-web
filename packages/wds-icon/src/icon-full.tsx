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
        d="M13.3387 9.88961C13.0015 10.2548 13.0243 10.8242 13.3895 11.1614C13.7548 11.4985 14.3242 11.4757 14.6613 11.1105L19.1 6.30196V10.0001C19.1 10.4971 19.5029 10.9001 20 10.9001C20.497 10.9001 20.9 10.4971 20.9 10.0001V4.00008C20.9 3.50303 20.497 3.10009 20 3.10009H14.5C14.0029 3.10009 13.6 3.50303 13.6 4.00008C13.6 4.49714 14.0029 4.90008 14.5 4.90008L17.9444 4.90008L13.3387 9.88961Z"
        fill="currentColor"
      />
      <path
        d="M4.90002 14C4.90002 13.503 4.49708 13.1001 4.00002 13.1001C3.50297 13.1001 3.10002 13.503 3.10002 14V20C3.10002 20.4971 3.50297 20.9 4.00002 20.9H9.5C9.99705 20.9 10.4 20.4971 10.4 20C10.4 19.503 9.99705 19.1 9.5 19.1H6.1728L10.6364 14.6364C10.9879 14.285 10.9879 13.7151 10.6364 13.3637C10.2849 13.0122 9.71507 13.0122 9.3636 13.3637L4.90002 17.8272V14Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFull;
