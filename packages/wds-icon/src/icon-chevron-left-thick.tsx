import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.4195 3.08022C16.9272 3.58791 16.9272 4.41102 16.4195 4.9187L9.33879 11.9995L16.4195 19.0802C16.9272 19.5879 16.9272 20.411 16.4195 20.9187C15.9119 21.4264 15.0888 21.4264 14.5811 20.9187L6.58108 12.9187C6.0734 12.411 6.0734 11.5879 6.58108 11.0802L14.5811 3.08022C15.0888 2.57254 15.9119 2.57254 16.4195 3.08022Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftThick;
