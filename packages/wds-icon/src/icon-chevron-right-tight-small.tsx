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
          d="M2.8637 4.86346C2.51223 5.21493 2.51223 5.78478 2.8637 6.13625L8.72731 11.9999L2.8637 17.8635C2.51223 18.2149 2.51223 18.7848 2.8637 19.1362C3.21517 19.4877 3.78502 19.4877 4.13649 19.1362L10.6365 12.6362C10.988 12.2848 10.988 11.7149 10.6365 11.3635L4.13649 4.86346C3.78502 4.51199 3.21517 4.51199 2.8637 4.86346Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightSmall;
