import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.58128 3.08021C7.07361 3.58789 7.07361 4.411 7.58128 4.91868L14.662 11.9994L7.58128 19.0801C7.07361 19.5878 7.07361 20.4109 7.58128 20.9186C8.08896 21.4263 8.91207 21.4263 9.41975 20.9186L17.4197 12.9186C17.9274 12.411 17.9274 11.5878 17.4197 11.0802L9.41975 3.08021C8.91207 2.57253 8.08896 2.57253 7.58128 3.08021Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightThick;
