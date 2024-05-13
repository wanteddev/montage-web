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
        d="M5.24969 13.75C6.21619 13.75 6.99969 12.9665 6.99969 12C6.99969 11.0335 6.21619 10.25 5.24969 10.25C4.2832 10.25 3.49969 11.0335 3.49969 12C3.49969 12.9665 4.2832 13.75 5.24969 13.75Z"
        fill="currentColor"
      />
      <path
        d="M13.7497 12C13.7497 12.9665 12.9662 13.75 11.9997 13.75C11.0332 13.75 10.2497 12.9665 10.2497 12C10.2497 11.0335 11.0332 10.25 11.9997 10.25C12.9662 10.25 13.7497 11.0335 13.7497 12Z"
        fill="currentColor"
      />
      <path
        d="M20.4997 12C20.4997 12.9665 19.7162 13.75 18.7497 13.75C17.7832 13.75 16.9997 12.9665 16.9997 12C16.9997 11.0335 17.7832 10.25 18.7497 10.25C19.7162 10.25 20.4997 11.0335 20.4997 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreHorizontal;
