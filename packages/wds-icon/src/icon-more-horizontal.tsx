import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoreHorizontal = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.24961 13.7499C6.2161 13.7499 6.9996 12.9664 6.9996 11.9999C6.9996 11.0334 6.2161 10.2499 5.24961 10.2499C4.28311 10.2499 3.49962 11.0334 3.49962 11.9999C3.49962 12.9664 4.28311 13.7499 5.24961 13.7499Z"
        fill="currentColor"
      />
      <path
        d="M13.7496 11.9999C13.7496 12.9664 12.9661 13.7499 11.9996 13.7499C11.0331 13.7499 10.2496 12.9664 10.2496 11.9999C10.2496 11.0334 11.0331 10.2499 11.9996 10.2499C12.9661 10.2499 13.7496 11.0334 13.7496 11.9999Z"
        fill="currentColor"
      />
      <path
        d="M20.4995 11.9999C20.4995 12.9664 19.716 13.7499 18.7495 13.7499C17.783 13.7499 16.9995 12.9664 16.9995 11.9999C16.9995 11.0334 17.783 10.2499 18.7495 10.2499C19.716 10.2499 20.4995 11.0334 20.4995 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreHorizontal;
