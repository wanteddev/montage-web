import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightTightSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    return (
      <Box
        as="svg"
        viewBox="0 0 12 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        ref={ref}
        {...props}
      >
        <path
          d="M2.86395 4.86346C2.51247 5.21493 2.51247 5.78478 2.86395 6.13625L8.72755 11.9999L2.86395 17.8635C2.51247 18.2149 2.51247 18.7848 2.86395 19.1362C3.21542 19.4877 3.78527 19.4877 4.13674 19.1362L10.6367 12.6362C10.9882 12.2848 10.9882 11.7149 10.6367 11.3635L4.13674 4.86346C3.78527 4.51199 3.21542 4.51199 2.86395 4.86346Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightSmall;
