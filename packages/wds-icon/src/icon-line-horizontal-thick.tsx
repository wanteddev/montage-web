import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLineHorizontalThick = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.70005 12.0001C4.70005 11.2822 5.28208 10.7001 6.00004 10.7001H18C18.7179 10.7001 19.3 11.2822 19.3 12.0001C19.3 12.7181 18.7179 13.3001 18 13.3001H6.00004C5.28208 13.3001 4.70005 12.7181 4.70005 12.0001Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconLineHorizontalThick;
