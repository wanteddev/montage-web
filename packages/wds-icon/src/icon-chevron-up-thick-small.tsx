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
          d="M4.08064 15.9191C4.58832 16.4268 5.41143 16.4268 5.91911 15.9191L11.9999 9.8384L18.0806 15.9191C18.5883 16.4268 19.4114 16.4268 19.9191 15.9191C20.4267 15.4115 20.4267 14.5884 19.9191 14.0807L12.9191 7.08069C12.4114 6.57301 11.5883 6.57301 11.0806 7.08069L4.08064 14.0807C3.57296 14.5884 3.57296 15.4115 4.08064 15.9191Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronUpThickSmall;
