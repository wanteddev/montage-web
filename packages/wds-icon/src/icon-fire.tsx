import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFire = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.49937 15.0997C8.49937 16.9997 10.0494 18.4997 11.9994 18.4997C13.9494 18.4997 15.4994 16.9997 15.4994 15.0997C15.4994 13.1997 13.9494 11.6997 11.9994 9.9997C10.0494 11.6997 8.49937 13.1997 8.49937 15.0997Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2641 1.83126C13.505 1.1326 12.3106 1.30585 11.7664 2.16298L8.81015 6.81902L8.11056 6.1894C7.48769 5.62881 6.48749 5.60007 5.85928 6.26208C3.96077 8.26274 2.84936 10.8745 2.84936 13.6001C2.84936 16.1301 3.78868 18.3442 5.43186 19.9239C7.07294 21.5016 9.36677 22.4001 11.9993 22.4001C17.3279 22.4001 21.1493 18.5155 21.1493 13.6001C21.1493 9.43735 18.4901 5.72067 14.2641 1.83126ZM9.75913 8.68253L13.1858 3.28558C17.2582 7.06266 19.3493 10.2839 19.3493 13.6001C19.3493 17.4847 16.3708 20.6001 11.9993 20.6001C9.78191 20.6001 7.95075 19.8486 6.67934 18.6263C5.41003 17.406 4.64935 15.6701 4.64935 13.6001C4.64935 11.4302 5.51075 9.31215 7.03387 7.64202L8.39728 8.86908C8.59415 9.04627 8.85907 9.12774 9.12149 9.09179C9.3839 9.05584 9.61716 8.90613 9.75913 8.68253Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFire;
