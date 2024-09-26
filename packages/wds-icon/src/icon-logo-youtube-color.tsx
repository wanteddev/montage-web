import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoYoutubeColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M22.2026 6.87724C21.9576 5.96134 21.2334 5.23715 20.3175 4.9922C18.6561 4.5449 11.9999 4.5449 11.9999 4.5449C11.9999 4.5449 5.3437 4.5449 3.68231 4.9922C2.76641 5.23715 2.04222 5.96134 1.79727 6.87724C1.34997 8.53863 1.34997 11.9999 1.34997 11.9999C1.34997 11.9999 1.34997 15.4611 1.79727 17.1225C2.04222 18.0384 2.76641 18.7626 3.68231 19.0075C5.3437 19.4548 11.9999 19.4548 11.9999 19.4548C11.9999 19.4548 18.6561 19.4548 20.3175 19.0075C21.2334 18.7626 21.9576 18.0384 22.2026 17.1225C22.6499 15.4611 22.6499 11.9999 22.6499 11.9999C22.6499 11.9999 22.6499 8.53863 22.2026 6.87724Z"
        fill="#FF0000"
      />
      <path
        d="M9.86994 15.1949V8.80489L15.4079 11.9999L9.86994 15.1949Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoYoutubeColor;
