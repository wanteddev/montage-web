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
        d="M16.4196 3.0802C16.9272 3.58787 16.9272 4.41098 16.4196 4.91866L9.33886 11.9994L16.4196 19.0801C16.9272 19.5877 16.9272 20.4108 16.4196 20.9185C15.9119 21.4262 15.0888 21.4262 14.5811 20.9185L6.58117 12.9186C6.0735 12.4109 6.0735 11.5878 6.58117 11.0801L14.5811 3.0802C15.0888 2.57252 15.9119 2.57252 16.4196 3.0802Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftThick;
