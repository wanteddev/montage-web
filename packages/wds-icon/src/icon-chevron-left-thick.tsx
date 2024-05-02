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
        d="M16.4194 3.0801C16.9271 3.58778 16.9271 4.4109 16.4194 4.91858L9.33867 11.9993L16.4194 19.0801C16.9271 19.5878 16.9271 20.4109 16.4194 20.9186C15.9118 21.4263 15.0886 21.4263 14.581 20.9186L6.58096 12.9186C6.07328 12.4109 6.07328 11.5878 6.58096 11.0801L14.581 3.0801C15.0886 2.57242 15.9118 2.57242 16.4194 3.0801Z"
      />
    </Box>
  );
});

export default IconChevronLeftThick;
