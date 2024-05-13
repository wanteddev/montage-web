import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronLeftThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M15.4198 4.58071C15.9275 5.08839 15.9275 5.91151 15.4198 6.41919L9.83904 12L15.4198 17.5807C15.9275 18.0884 15.9275 18.9115 15.4198 19.4192C14.9121 19.9269 14.089 19.9269 13.5813 19.4192L7.08132 12.9192C6.57364 12.4115 6.57364 11.5884 7.08132 11.0807L13.5813 4.58071C14.089 4.07303 14.9121 4.07303 15.4198 4.58071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftThickSmall;
