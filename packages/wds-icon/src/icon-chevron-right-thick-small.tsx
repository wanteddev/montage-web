import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M8.58157 4.58096C8.07389 5.08864 8.07389 5.91175 8.58157 6.41943L14.1623 12.0002L8.58157 17.581C8.07389 18.0886 8.07389 18.9118 8.58157 19.4194C9.08925 19.9271 9.91236 19.9271 10.42 19.4194L16.92 12.9194C17.4277 12.4118 17.4277 11.5886 16.92 11.081L10.42 4.58096C9.91236 4.07327 9.08925 4.07327 8.58157 4.58096Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightThickSmall;
