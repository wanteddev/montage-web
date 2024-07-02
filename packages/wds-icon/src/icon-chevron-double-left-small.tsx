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
          d="M11.6365 6.13985C11.988 5.78838 11.988 5.21854 11.6365 4.86707C11.285 4.5156 10.7152 4.5156 10.3637 4.86707L3.86378 11.367C3.695 11.5358 3.60018 11.7647 3.60018 12.0034C3.60018 12.2421 3.695 12.471 3.86378 12.6398L10.3637 19.1397C10.7152 19.4912 11.285 19.4912 11.6365 19.1397C11.988 18.7882 11.988 18.2184 11.6365 17.8669L5.77295 12.0034L11.6365 6.13985ZM19.6366 6.13985C19.9881 5.78838 19.9881 5.21854 19.6366 4.86707C19.2852 4.5156 18.7153 4.5156 18.3638 4.86707L11.8639 11.367C11.6951 11.5358 11.6003 11.7647 11.6003 12.0034C11.6003 12.2421 11.6951 12.471 11.8639 12.6398L18.3638 19.1397C18.7153 19.4912 19.2852 19.4912 19.6366 19.1397C19.9881 18.7882 19.9881 18.2184 19.6366 17.8669L13.7731 12.0034L19.6366 6.13985Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftSmall;
