import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleBlock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12 2.10009C6.53245 2.10009 2.10009 6.53245 2.10009 12C2.10009 17.4676 6.53245 21.9 12 21.9C17.4676 21.9 21.9 17.4676 21.9 12C21.9 6.53245 17.4676 2.10009 12 2.10009ZM3.90008 12C3.90008 7.52655 7.52655 3.90008 12 3.90008C13.9125 3.90008 15.6702 4.5629 17.0559 5.67136L5.67136 17.0559C4.5629 15.6702 3.90008 13.9125 3.90008 12ZM6.94414 18.3287C8.32984 19.4372 10.0875 20.1 12 20.1C16.4735 20.1 20.1 16.4735 20.1 12C20.1 10.0875 19.4372 8.32984 18.3287 6.94415L6.94414 18.3287Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleBlock;
