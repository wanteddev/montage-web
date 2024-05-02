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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        d="M15.137 4.8637C15.4885 5.21517 15.4885 5.78502 15.137 6.13649L9.27338 12.0001L15.137 17.8637C15.4885 18.2152 15.4885 18.785 15.137 19.1365C14.7855 19.488 14.2157 19.488 13.8642 19.1365L7.36419 12.6365C7.01272 12.285 7.01272 11.7152 7.36419 11.3637L13.8642 4.8637C14.2157 4.51223 14.7855 4.51223 15.137 4.8637Z"
      />
    </Box>
  );
});

export default IconChevronLeftSmall;
