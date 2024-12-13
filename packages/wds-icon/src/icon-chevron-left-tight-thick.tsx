import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftTightThick = forwardRef<SVGSVGElement, Props>(
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
          d="M10.4191 3.07996C10.9268 3.58763 10.9268 4.41074 10.4191 4.91842L3.33837 11.9991L10.4191 19.0798C10.9268 19.5875 10.9268 20.4106 10.4191 20.9183C9.9114 21.426 9.08829 21.426 8.58062 20.9183L0.580677 12.9184C0.0729998 12.4107 0.0729999 11.5876 0.580677 11.0799L8.58062 3.07996C9.08829 2.57228 9.9114 2.57228 10.4191 3.07996Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThick;
