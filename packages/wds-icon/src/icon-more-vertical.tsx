import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoreVertical = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.7497 18.7499C13.7497 17.7834 12.9662 16.9999 11.9997 16.9999C11.0332 16.9999 10.2497 17.7834 10.2497 18.7499C10.2497 19.7164 11.0332 20.4999 11.9997 20.4999C12.9662 20.4999 13.7497 19.7164 13.7497 18.7499Z"
        fill="currentColor"
      />
      <path
        d="M11.9997 10.25C12.9662 10.25 13.7497 11.0335 13.7497 12C13.7497 12.9664 12.9662 13.7499 11.9997 13.7499C11.0332 13.7499 10.2497 12.9664 10.2497 12C10.2497 11.0335 11.0332 10.25 11.9997 10.25Z"
        fill="currentColor"
      />
      <path
        d="M11.9997 3.49999C12.9662 3.49999 13.7497 4.28349 13.7497 5.24998C13.7497 6.21647 12.9662 6.99997 11.9997 6.99997C11.0332 6.99997 10.2497 6.21647 10.2497 5.24998C10.2497 4.28349 11.0332 3.49999 11.9997 3.49999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVertical;
