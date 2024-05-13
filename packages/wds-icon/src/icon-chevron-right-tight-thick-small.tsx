import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronRightTightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M2.5812 4.58096C2.07352 5.08864 2.07352 5.91175 2.5812 6.41943L8.16196 12.0002L2.5812 17.581C2.07352 18.0886 2.07352 18.9118 2.5812 19.4194C3.08888 19.9271 3.912 19.9271 4.41968 19.4194L10.9197 12.9194C11.4274 12.4118 11.4274 11.5886 10.9197 11.081L4.41968 4.58096C3.912 4.07327 3.08888 4.07327 2.5812 4.58096Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThickSmall;
