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
          d="M4.70003 12.0002C4.70003 11.2822 5.28206 10.7002 6.00003 10.7002H18C18.718 10.7002 19.3 11.2822 19.3 12.0002C19.3 12.7181 18.718 13.3002 18 13.3002H6.00003C5.28206 13.3002 4.70003 12.7181 4.70003 12.0002Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconLineHorizontalThick;
