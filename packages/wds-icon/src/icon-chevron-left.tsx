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
        d="M16.1364 3.36297C16.4878 3.71444 16.4878 4.28429 16.1364 4.63576L8.77277 11.9994L16.1364 19.363C16.4878 19.7144 16.4878 20.2843 16.1364 20.6358C15.7849 20.9872 15.2151 20.9872 14.8636 20.6358L6.86358 12.6358C6.51211 12.2843 6.51211 11.7144 6.86358 11.363L14.8636 3.36297C15.2151 3.0115 15.7849 3.0115 16.1364 3.36297Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeft;
