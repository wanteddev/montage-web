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
          d="M2.86395 4.63991C2.51247 4.28844 2.51247 3.71859 2.86395 3.36712C3.21542 3.01565 3.78527 3.01565 4.13674 3.36712L12.1367 11.3671C12.4882 11.7186 12.4882 12.2884 12.1367 12.6399L4.13674 20.6399C3.78527 20.9914 3.21542 20.9914 2.86395 20.6399C2.51247 20.2884 2.51247 19.7186 2.86395 19.3671L10.2275 12.0035L2.86395 4.63991ZM12.3639 4.63991C12.0125 4.28844 12.0125 3.71859 12.3639 3.36712C12.7154 3.01565 13.2853 3.01565 13.6367 3.36712L21.6367 11.3671C21.9882 11.7186 21.9882 12.2884 21.6367 12.6399L13.6367 20.6399C13.2853 20.9914 12.7154 20.9914 12.3639 20.6399C12.0125 20.2884 12.0125 19.7186 12.3639 19.3671L19.7275 12.0035L12.3639 4.63991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRight;
