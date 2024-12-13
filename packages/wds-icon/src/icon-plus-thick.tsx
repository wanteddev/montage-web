import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9997 2.70214C12.7176 2.70214 13.2997 3.28417 13.2997 4.00213V10.7021H19.9996C20.7176 10.7021 21.2996 11.2841 21.2996 12.0021C21.2996 12.7201 20.7176 13.3021 19.9996 13.3021H13.2997V20.0021C13.2997 20.72 12.7176 21.3021 11.9997 21.3021C11.2817 21.3021 10.6997 20.72 10.6997 20.0021V13.3021H3.99969C3.28172 13.3021 2.6997 12.7201 2.6997 12.0021C2.6997 11.2841 3.28172 10.7021 3.99969 10.7021H10.6997V4.00213C10.6997 3.28417 11.2817 2.70214 11.9997 2.70214Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlusThick;
