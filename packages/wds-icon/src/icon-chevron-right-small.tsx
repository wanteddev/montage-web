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
        d="M8.86398 4.86341C8.51251 5.21488 8.51251 5.78472 8.86398 6.13619L14.7275 11.9997L8.86398 17.8633C8.51251 18.2147 8.51251 18.7846 8.86398 19.1361C9.21545 19.4875 9.78529 19.4875 10.1368 19.1361L16.6367 12.6361C16.9882 12.2847 16.9882 11.7148 16.6367 11.3633L10.1368 4.86341C9.78529 4.51194 9.21545 4.51194 8.86398 4.86341Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightSmall;
