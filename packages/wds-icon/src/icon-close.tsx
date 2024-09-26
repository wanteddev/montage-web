import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.86343 4.86343C5.2149 4.51196 5.78475 4.51196 6.13622 4.86343L11.9998 10.727L17.8634 4.86343C18.2148 4.51196 18.7847 4.51196 19.1362 4.86343C19.4876 5.2149 19.4876 5.78475 19.1362 6.13622L13.2726 11.9998L19.1362 17.8634C19.4876 18.2148 19.4876 18.7847 19.1362 19.1362C18.7847 19.4876 18.2148 19.4876 17.8634 19.1362L11.9998 13.2726L6.13622 19.1362C5.78475 19.4876 5.2149 19.4876 4.86343 19.1362C4.51196 18.7847 4.51196 18.2148 4.86343 17.8634L10.727 11.9998L4.86343 6.13622C4.51196 5.78475 4.51196 5.2149 4.86343 4.86343Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
