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
        d="M8.49937 15.0997C8.49937 16.9997 10.0494 18.4997 11.9994 18.4997C13.9494 18.4997 15.4994 16.9997 15.4994 15.0997C15.4994 13.1997 13.9494 11.6997 11.9994 9.99972C10.0494 11.6997 8.49937 13.1997 8.49937 15.0997Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2641 1.83127C13.505 1.13261 12.3106 1.30585 11.7664 2.16299L8.81015 6.81904L8.11057 6.18941C7.4877 5.62883 6.4875 5.60008 5.85929 6.2621C3.96077 8.26276 2.84937 10.8746 2.84937 13.6001C2.84937 16.1301 3.78869 18.3442 5.43187 19.9239C7.07295 21.5016 9.36677 22.4001 11.9993 22.4001C17.3279 22.4001 21.1493 18.5155 21.1493 13.6001C21.1493 9.43738 18.4901 5.72069 14.2641 1.83127ZM9.75914 8.68255L13.1858 3.28558C17.2582 7.06268 19.3493 10.2839 19.3493 13.6001C19.3493 17.4848 16.3708 20.6001 11.9993 20.6001C9.78192 20.6001 7.95075 19.8486 6.67935 18.6263C5.41003 17.406 4.64936 15.6701 4.64936 13.6001C4.64936 11.4303 5.51076 9.31217 7.03388 7.64204L8.39728 8.86911C8.59415 9.04629 8.85908 9.12776 9.12149 9.09181C9.38391 9.05587 9.61717 8.90615 9.75914 8.68255Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFire;
