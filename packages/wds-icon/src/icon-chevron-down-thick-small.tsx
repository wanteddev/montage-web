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
          d="M4.08061 8.08068C4.58828 7.573 5.4114 7.573 5.91908 8.08068L11.9998 14.1614L18.0806 8.08068C18.5882 7.573 19.4113 7.573 19.919 8.08068C20.4267 8.58836 20.4267 9.41147 19.919 9.91915L12.919 16.9191C12.4114 17.4268 11.5883 17.4268 11.0806 16.9191L4.08061 9.91915C3.57293 9.41147 3.57293 8.58836 4.08061 8.08068Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDownThickSmall;
