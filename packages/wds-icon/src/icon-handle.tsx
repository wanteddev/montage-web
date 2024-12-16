import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHandle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.99993 8.60008C3.50288 8.60008 3.09994 9.00302 3.09994 9.50007C3.09994 9.99713 3.50288 10.4001 3.99993 10.4001H19.9999C20.4969 10.4001 20.8999 9.99713 20.8999 9.50007C20.8999 9.00302 20.4969 8.60008 19.9999 8.60008H3.99993Z"
        fill="currentColor"
      />
      <path
        d="M3.99993 13.6001C3.50288 13.6001 3.09994 14.003 3.09994 14.5001C3.09994 14.9971 3.50288 15.4001 3.99993 15.4001H19.9999C20.4969 15.4001 20.8999 14.9971 20.8999 14.5001C20.8999 14.003 20.4969 13.6001 19.9999 13.6001H3.99993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandle;
