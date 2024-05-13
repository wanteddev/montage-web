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
        d="M12.9 5.0001C12.9 4.50304 12.4971 4.1001 12 4.1001C11.5029 4.1001 11.1 4.50304 11.1 5.0001V14.5001C11.1 14.9972 11.5029 15.4001 12 15.4001C12.4971 15.4001 12.9 14.9972 12.9 14.5001V5.0001Z"
        fill="currentColor"
      />
      <path
        d="M11.9999 20.2501C12.6902 20.2501 13.2499 19.6905 13.2499 19.0001C13.2499 18.3097 12.6902 17.7501 11.9999 17.7501C11.3095 17.7501 10.7499 18.3097 10.7499 19.0001C10.7499 19.6905 11.3095 20.2501 11.9999 20.2501Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconExclamation;
