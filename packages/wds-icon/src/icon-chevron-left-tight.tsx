import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M10.1362 3.36294C10.4877 3.71441 10.4877 4.28426 10.1362 4.63573L2.77269 11.9993L10.1362 19.3628C10.4877 19.7143 10.4877 20.2841 10.1362 20.6356C9.78476 20.9871 9.21492 20.9871 8.86345 20.6356L0.863512 12.6357C0.512043 12.2842 0.512043 11.7144 0.863512 11.3629L8.86345 3.36294C9.21492 3.01147 9.78476 3.01147 10.1362 3.36294Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftTight;
