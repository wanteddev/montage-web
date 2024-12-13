import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.86396 4.86341C8.51249 5.21488 8.51249 5.78473 8.86396 6.1362L14.7275 11.9997L8.86396 17.8633C8.51249 18.2148 8.51249 18.7846 8.86396 19.1361C9.21543 19.4875 9.78527 19.4875 10.1367 19.1361L16.6367 12.6361C16.9882 12.2847 16.9882 11.7148 16.6367 11.3634L10.1367 4.86341C9.78527 4.51195 9.21543 4.51195 8.86396 4.86341Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightSmall;
