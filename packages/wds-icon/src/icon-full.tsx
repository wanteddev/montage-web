import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFull = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.3387 9.88948C13.0016 10.2547 13.0243 10.8241 13.3896 11.1612C13.7548 11.4984 14.3242 11.4756 14.6613 11.1104L19.1 6.30183V9.99992C19.1 10.497 19.5029 10.8999 20 10.8999C20.497 10.8999 20.9 10.497 20.9 9.99993V3.99996C20.9 3.5029 20.497 3.09996 20 3.09996H14.5C14.003 3.09996 13.6 3.5029 13.6 3.99996C13.6 4.49701 14.003 4.89995 14.5 4.89995L17.9444 4.89995L13.3387 9.88948Z"
        fill="currentColor"
      />
      <path
        d="M4.90007 13.9999C4.90007 13.5029 4.49713 13.0999 4.00008 13.0999C3.50302 13.0999 3.10008 13.5029 3.10008 13.9999V19.9999C3.10008 20.4969 3.50302 20.8999 4.00008 20.8999H9.50005C9.9971 20.8999 10.4 20.4969 10.4 19.9999C10.4 19.5028 9.9971 19.0999 9.50005 19.0999H6.17286L10.6364 14.6363C10.9879 14.2848 10.9879 13.715 10.6364 13.3635C10.285 13.012 9.71512 13.012 9.36365 13.3635L4.90007 17.8271V13.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFull;
