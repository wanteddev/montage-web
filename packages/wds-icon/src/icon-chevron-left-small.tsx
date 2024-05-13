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
        d="M15.1369 4.8637C15.4883 5.21517 15.4883 5.78502 15.1369 6.13649L9.27326 12.0001L15.1369 17.8637C15.4883 18.2152 15.4883 18.785 15.1369 19.1365C14.7854 19.488 14.2155 19.488 13.8641 19.1365L7.36407 12.6365C7.0126 12.285 7.0126 11.7152 7.36407 11.3637L13.8641 4.8637C14.2155 4.51223 14.7854 4.51223 15.1369 4.8637Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftSmall;
