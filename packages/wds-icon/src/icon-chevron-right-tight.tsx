import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M1.86334 3.36272C1.51186 3.7142 1.51186 4.28405 1.86334 4.63552L9.22694 11.9991L1.86334 19.3627C1.51186 19.7142 1.51186 20.284 1.86334 20.6355C2.21481 20.987 2.78466 20.987 3.13613 20.6355L11.1361 12.6355C11.4876 12.284 11.4876 11.7142 11.1361 11.3627L3.13613 3.36272C2.78466 3.01125 2.21481 3.01125 1.86334 3.36272Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightTight;
