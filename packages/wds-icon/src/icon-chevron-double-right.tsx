import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleRight = forwardRef<SVGSVGElement, Props>(
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
          d="M2.86401 4.63987C2.51254 4.2884 2.51254 3.71856 2.86401 3.36709C3.21548 3.01562 3.78532 3.01562 4.13679 3.36709L12.1367 11.367C12.4882 11.7185 12.4882 12.2883 12.1367 12.6398L4.13679 20.6397C3.78532 20.9912 3.21548 20.9912 2.86401 20.6397C2.51254 20.2883 2.51254 19.7184 2.86401 19.3669L10.2276 12.0034L2.86401 4.63987ZM12.3639 4.63987C12.0125 4.2884 12.0125 3.71856 12.3639 3.36709C12.7154 3.01562 13.2852 3.01562 13.6367 3.36709L21.6366 11.367C21.9881 11.7185 21.9881 12.2883 21.6366 12.6398L13.6367 20.6397C13.2852 20.9912 12.7154 20.9912 12.3639 20.6397C12.0125 20.2883 12.0125 19.7184 12.3639 19.3669L19.7275 12.0034L12.3639 4.63987Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRight;
