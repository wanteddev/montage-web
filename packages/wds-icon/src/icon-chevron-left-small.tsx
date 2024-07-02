import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.1367 4.86365C15.4882 5.21512 15.4882 5.78496 15.1367 6.13643L9.27316 12L15.1367 17.8635C15.4882 18.215 15.4882 18.7848 15.1367 19.1363C14.7852 19.4878 14.2154 19.4878 13.8639 19.1363L7.36399 12.6364C7.01252 12.2849 7.01252 11.7151 7.36399 11.3636L13.8639 4.86365C14.2154 4.51218 14.7852 4.51218 15.1367 4.86365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftSmall;
