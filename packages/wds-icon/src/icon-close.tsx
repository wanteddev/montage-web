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
        d="M4.86343 4.86319C5.2149 4.51172 5.78475 4.51172 6.13622 4.86319L11.9998 10.7268L17.8634 4.86319C18.2148 4.51172 18.7847 4.51172 19.1362 4.86319C19.4876 5.21466 19.4876 5.7845 19.1362 6.13597L13.2726 11.9996L19.1362 17.8631C19.4876 18.2146 19.4876 18.7845 19.1362 19.1359C18.7847 19.4874 18.2148 19.4874 17.8634 19.1359L11.9998 13.2723L6.13622 19.1359C5.78475 19.4874 5.2149 19.4874 4.86343 19.1359C4.51196 18.7845 4.51196 18.2146 4.86343 17.8631L10.727 11.9996L4.86343 6.13597C4.51196 5.7845 4.51196 5.21466 4.86343 4.86319Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
