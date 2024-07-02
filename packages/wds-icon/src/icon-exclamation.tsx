import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconExclamation = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.8999 5.00007C12.8999 4.50302 12.497 4.10008 11.9999 4.10008C11.5029 4.10008 11.0999 4.50302 11.0999 5.00007V14.5C11.0999 14.9971 11.5029 15.4 11.9999 15.4C12.497 15.4 12.8999 14.9971 12.8999 14.5V5.00007Z"
        fill="currentColor"
      />
      <path
        d="M11.9998 20.25C12.6902 20.25 13.2498 19.6904 13.2498 19C13.2498 18.3096 12.6902 17.75 11.9998 17.75C11.3095 17.75 10.7498 18.3096 10.7498 19C10.7498 19.6904 11.3095 20.25 11.9998 20.25Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconExclamation;
