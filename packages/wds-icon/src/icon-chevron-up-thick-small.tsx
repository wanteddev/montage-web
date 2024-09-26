import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronUpThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08057 15.9191C4.58825 16.4268 5.41136 16.4268 5.91904 15.9191L11.9998 9.83838L18.0805 15.9191C18.5882 16.4268 19.4113 16.4268 19.919 15.9191C20.4266 15.4114 20.4266 14.5883 19.919 14.0806L12.919 7.08068C12.4113 6.573 11.5882 6.573 11.0805 7.08068L4.08057 14.0806C3.57289 14.5883 3.57289 15.4114 4.08057 15.9191Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronUpThickSmall;
