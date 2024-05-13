import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleRightSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.36388 6.13991C4.01241 5.78844 4.01241 5.21859 4.36388 4.86712C4.71536 4.51565 5.2852 4.51565 5.63668 4.86712L12.1367 11.3671C12.3055 11.5359 12.4003 11.7648 12.4003 12.0035C12.4003 12.2422 12.3055 12.4711 12.1367 12.6399L5.63668 19.1399C5.28521 19.4914 4.71536 19.4914 4.36389 19.1399C4.01241 18.7884 4.01241 18.2186 4.36389 17.8671L10.2275 12.0035L4.36388 6.13991ZM12.3641 6.13991C12.0126 5.78844 12.0126 5.21859 12.3641 4.86712C12.7155 4.51565 13.2854 4.51565 13.6369 4.86712L20.1369 11.3671C20.3056 11.5359 20.4005 11.7648 20.4005 12.0035C20.4005 12.2422 20.3056 12.4711 20.1369 12.6399L13.6369 19.1399C13.2854 19.4914 12.7155 19.4914 12.3641 19.1399C12.0126 18.7884 12.0126 18.2186 12.3641 17.8671L18.2277 12.0035L12.3641 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightSmall;
