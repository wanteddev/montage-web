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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.69971 12.0002C4.69971 11.2822 5.28174 10.7002 5.99971 10.7002H17.9997C18.7177 10.7002 19.2997 11.2822 19.2997 12.0002C19.2997 12.7182 18.7177 13.3002 17.9997 13.3002H5.99971C5.28174 13.3002 4.69971 12.7182 4.69971 12.0002Z"
        />
      </Box>
    );
  },
);

export default IconLineHorizontalThick;
