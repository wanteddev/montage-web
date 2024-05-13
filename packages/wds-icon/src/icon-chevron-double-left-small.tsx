import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDoubleLeftSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M11.6367 6.13991C11.9881 5.78844 11.9881 5.21859 11.6367 4.86712C11.2852 4.51565 10.7154 4.51565 10.3639 4.86712L3.86389 11.3671C3.6951 11.5359 3.60028 11.7648 3.60028 12.0035C3.60028 12.2422 3.6951 12.4711 3.86389 12.6399L10.3639 19.1399C10.7154 19.4914 11.2852 19.4914 11.6367 19.1399C11.9881 18.7884 11.9881 18.2186 11.6367 17.8671L5.77307 12.0035L11.6367 6.13991ZM19.6369 6.13991C19.9884 5.78844 19.9884 5.21859 19.6369 4.86712C19.2854 4.51565 18.7156 4.51565 18.3641 4.86712L11.8641 11.3671C11.6953 11.5359 11.6005 11.7648 11.6005 12.0035C11.6005 12.2422 11.6953 12.4711 11.8641 12.6399L18.3641 19.1399C18.7156 19.4914 19.2854 19.4914 19.6369 19.1399C19.9884 18.7884 19.9884 18.2186 19.6369 17.8671L13.7733 12.0035L19.6369 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftSmall;
