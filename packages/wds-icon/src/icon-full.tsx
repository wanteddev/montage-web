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
        d="M13.3387 9.8896C13.0016 10.2548 13.0243 10.8242 13.3896 11.1614C13.7548 11.4985 14.3242 11.4757 14.6613 11.1105L19.1 6.30195V10C19.1 10.4971 19.5029 10.9 20 10.9C20.497 10.9 20.9 10.4971 20.9 10V4.00008C20.9 3.50302 20.497 3.10008 20 3.10008H14.5C14.003 3.10008 13.6 3.50302 13.6 4.00008C13.6 4.49713 14.003 4.90007 14.5 4.90007L17.9444 4.90007L13.3387 9.8896Z"
        fill="currentColor"
      />
      <path
        d="M4.90007 14C4.90007 13.503 4.49713 13.1 4.00008 13.1C3.50302 13.1 3.10008 13.503 3.10008 14V20C3.10008 20.4971 3.50302 20.9 4.00008 20.9H9.50005C9.9971 20.9 10.4 20.4971 10.4 20C10.4 19.5029 9.9971 19.1 9.50005 19.1H6.17286L10.6364 14.6364C10.9879 14.285 10.9879 13.7151 10.6364 13.3636C10.285 13.0122 9.71512 13.0122 9.36365 13.3636L4.90007 17.8272V14Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFull;
