import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDownThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M4.08057 8.08067C4.58825 7.57299 5.41136 7.57299 5.91904 8.08067L11.9998 14.1614L18.0805 8.08067C18.5882 7.57299 19.4113 7.57299 19.919 8.08067C20.4266 8.58835 20.4266 9.41146 19.919 9.91914L12.919 16.9191C12.4113 17.4268 11.5882 17.4268 11.0805 16.9191L4.08057 9.91914C3.57289 9.41146 3.57289 8.58835 4.08057 8.08067Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDownThickSmall;
