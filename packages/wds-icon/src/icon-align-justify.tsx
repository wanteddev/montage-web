import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignJustify = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49998 4.60059C4.00292 4.60059 3.59998 5.00353 3.59998 5.50059C3.59998 5.99764 4.00292 6.40059 4.49998 6.40059H19.5C19.997 6.40059 20.4 5.99764 20.4 5.50059C20.4 5.00353 19.997 4.60059 19.5 4.60059H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M4.49998 8.93392C4.00292 8.93392 3.59998 9.33686 3.59998 9.83392C3.59998 10.331 4.00292 10.7339 4.49998 10.7339H19.5C19.997 10.7339 20.4 10.331 20.4 9.83392C20.4 9.33686 19.997 8.93392 19.5 8.93392H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M3.59998 14.1673C3.59998 13.6702 4.00292 13.2673 4.49998 13.2673H19.5C19.997 13.2673 20.4 13.6702 20.4 14.1673C20.4 14.6643 19.997 15.0673 19.5 15.0673H4.49998C4.00292 15.0673 3.59998 14.6643 3.59998 14.1673Z"
        fill="currentColor"
      />
      <path
        d="M4.49998 17.6006C4.00292 17.6006 3.59998 18.0035 3.59998 18.5006C3.59998 18.9976 4.00292 19.4006 4.49998 19.4006H19.5C19.997 19.4006 20.4 18.9976 20.4 18.5006C20.4 18.0035 19.997 17.6006 19.5 17.6006H4.49998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignJustify;
