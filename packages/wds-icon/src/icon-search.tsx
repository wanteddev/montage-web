import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconSearch = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0831 2.10009C5.90187 2.10009 2.51232 5.63702 2.51232 10C2.51232 14.3631 5.90187 17.9 10.0831 17.9C11.863 17.9 13.4995 17.2591 14.792 16.1863L19.5358 21.1363C19.8726 21.4878 20.4187 21.4878 20.7556 21.1363C21.0924 20.7849 21.0924 20.215 20.7556 19.8636L16.0118 14.9135C17.0397 13.5648 17.6539 11.8572 17.6539 10C17.6539 5.63702 14.2643 2.10009 10.0831 2.10009ZM4.23731 10C4.23731 6.63113 6.85456 3.90008 10.0831 3.90008C13.3116 3.90008 15.9289 6.63113 15.9289 10C15.9289 13.369 13.3116 16.1 10.0831 16.1C6.85456 16.1 4.23731 13.369 4.23731 10Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
