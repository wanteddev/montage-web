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
        d="M10.1363 3.36297C10.4877 3.71444 10.4877 4.28429 10.1363 4.63576L2.77265 11.9994L10.1362 19.363C10.4877 19.7144 10.4877 20.2843 10.1362 20.6358C9.78478 20.9872 9.21493 20.9872 8.86346 20.6358L0.863457 12.6358C0.511986 12.2843 0.511986 11.7144 0.863457 11.363L8.86346 3.36297C9.21493 3.0115 9.78478 3.0115 10.1363 3.36297Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftTight;
