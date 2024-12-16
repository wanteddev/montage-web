import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.1364 3.36294C16.4878 3.71441 16.4878 4.28425 16.1364 4.63572L8.77284 11.9993L16.1364 19.3628C16.4878 19.7143 16.4878 20.2841 16.1364 20.6356C15.7849 20.987 15.2151 20.987 14.8636 20.6356L6.86367 12.6356C6.5122 12.2842 6.5122 11.7143 6.86367 11.3629L14.8636 3.36294C15.2151 3.01147 15.7849 3.01147 16.1364 3.36294Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeft;
