import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFireFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6086 2.41168C12.2336 1.42732 13.6097 1.22101 14.4832 2.03436C18.5797 5.84862 21.1493 9.50837 21.1493 13.6004C21.1493 18.5157 17.3279 22.4004 11.9993 22.4004C9.36677 22.4004 7.07294 21.5019 5.43186 19.9242C3.78868 18.3445 2.84936 16.1304 2.84936 13.6004C2.84936 10.8748 3.96077 8.26302 5.85928 6.26236C6.48749 5.60035 7.48769 5.62909 8.11056 6.18967L8.81015 6.8193L11.6086 2.41168ZM8.49934 15.6C8.49934 17.5 10.0493 19 11.9993 19C13.9493 19 15.4993 17.5 15.4993 15.6C15.4993 13.7 13.9493 12.2 11.9993 10.5C10.0493 12.2 8.49934 13.7 8.49934 15.6Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFireFill;
