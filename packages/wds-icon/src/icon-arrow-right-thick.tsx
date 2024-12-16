import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.4193 11.0807C21.927 11.5883 21.927 12.4115 21.4193 12.9191L14.4193 19.9191C13.9116 20.4268 13.0885 20.4268 12.5809 19.9191C12.0732 19.4114 12.0732 18.5883 12.5809 18.0806L17.3616 13.2999H3.50012C2.78215 13.2999 2.20013 12.7179 2.20013 11.9999C2.20013 11.2819 2.78215 10.6999 3.50012 10.6999H17.3616L12.5809 5.91917C12.0732 5.41149 12.0732 4.58838 12.5809 4.0807C13.0885 3.57302 13.9116 3.57302 14.4193 4.0807L21.4193 11.0807Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRightThick;
