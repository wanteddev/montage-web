import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconUnderline = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9985 17.8287C8.10046 17.8287 5.51744 14.9639 5.51744 10.6902V4.03321C5.51744 3.46258 5.98002 3 6.55065 3C7.12127 3 7.58385 3.46258 7.58385 4.03321V10.6902C7.58385 13.7898 9.345 15.8562 11.9985 15.8562C14.6519 15.8562 16.4131 13.7898 16.4131 10.6902V4.03321C16.4131 3.46258 16.8757 3 17.4463 3C18.0169 3 18.4795 3.46258 18.4795 4.03321V10.6902C18.4795 14.9639 15.8965 17.8287 11.9985 17.8287Z"
        fill="currentColor"
      />
      <path
        d="M5.0001 20.1C4.50304 20.1 4.1001 20.5029 4.1001 21C4.1001 21.4971 4.50304 21.9 5.0001 21.9H19.0001C19.4971 21.9 19.9001 21.4971 19.9001 21C19.9001 20.5029 19.4971 20.1 19.0001 20.1H5.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconUnderline;
