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
        d="M16.4195 3.08019C16.9272 3.58787 16.9272 4.41098 16.4195 4.91865L9.33882 11.9993L16.4195 19.08C16.9272 19.5877 16.9272 20.4108 16.4195 20.9185C15.9118 21.4262 15.0887 21.4262 14.581 20.9185L6.58113 12.9186C6.07346 12.4109 6.07346 11.5878 6.58113 11.0801L14.581 3.08019C15.0887 2.57252 15.9118 2.57252 16.4195 3.08019Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftThick;
