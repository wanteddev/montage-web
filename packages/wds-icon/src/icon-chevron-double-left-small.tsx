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
          d="M11.6365 6.13986C11.988 5.78839 11.988 5.21855 11.6365 4.86708C11.285 4.51561 10.7152 4.51561 10.3637 4.86708L3.86376 11.367C3.69498 11.5358 3.60016 11.7647 3.60016 12.0034C3.60016 12.2421 3.69498 12.471 3.86376 12.6398L10.3637 19.1397C10.7152 19.4912 11.285 19.4912 11.6365 19.1397C11.988 18.7883 11.988 18.2184 11.6365 17.867L5.77293 12.0034L11.6365 6.13986ZM19.6366 6.13986C19.9881 5.78839 19.9881 5.21855 19.6366 4.86708C19.2851 4.51561 18.7153 4.51561 18.3638 4.86708L11.8639 11.367C11.6951 11.5358 11.6003 11.7647 11.6003 12.0034C11.6003 12.2421 11.6951 12.471 11.8639 12.6398L18.3638 19.1397C18.7153 19.4912 19.2851 19.4912 19.6366 19.1397C19.9881 18.7883 19.9881 18.2184 19.6366 17.867L13.7731 12.0034L19.6366 6.13986Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftSmall;
