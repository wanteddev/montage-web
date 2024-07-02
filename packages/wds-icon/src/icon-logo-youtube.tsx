import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoYoutube = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.3175 4.9922C21.2334 5.23715 21.9576 5.96134 22.2026 6.87724C22.6499 8.53863 22.6499 11.9999 22.6499 11.9999C22.6499 11.9999 22.6499 15.4611 22.2026 17.1225C21.9576 18.0384 21.2334 18.7626 20.3175 19.0075C18.6561 19.4548 11.9999 19.4548 11.9999 19.4548C11.9999 19.4548 5.3437 19.4548 3.68231 19.0075C2.76641 18.7626 2.04222 18.0384 1.79727 17.1225C1.34997 15.4611 1.34997 11.9999 1.34997 11.9999C1.34997 11.9999 1.34997 8.53863 1.79727 6.87724C2.04222 5.96134 2.76641 5.23715 3.68231 4.9922C5.3437 4.5449 11.9999 4.5449 11.9999 4.5449C11.9999 4.5449 18.6561 4.5449 20.3175 4.9922ZM9.86994 8.80513V15.1951L15.4079 12.0001L9.86994 8.80513Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoYoutube;
