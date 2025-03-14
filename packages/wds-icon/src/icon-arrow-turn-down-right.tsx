import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconArrowTurnDownRight = forwardRef<SVGSVGElement, Props>(
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
          d="M5.89987 3.99765C5.89987 3.50059 5.49693 3.09765 4.99987 3.09765C4.50282 3.09765 4.09987 3.50059 4.09987 3.99765V5.53737C4.09987 6.90384 4.09986 7.98442 4.17098 8.85491C4.24365 9.74433 4.39503 10.4934 4.74293 11.1762C5.30859 12.2863 6.21117 13.1889 7.32132 13.7546C8.00412 14.1025 8.75317 14.2538 9.64258 14.3265C10.5131 14.3976 11.5936 14.3976 12.9601 14.3976H17.3284L13.8634 17.8626C13.512 18.2141 13.512 18.7839 13.8634 19.1354C14.2149 19.4868 14.7848 19.4868 15.1362 19.1354L20.1362 14.1354C20.4877 13.7839 20.4877 13.2141 20.1362 12.8626L15.1362 7.86261C14.7848 7.51114 14.2149 7.51114 13.8634 7.86261C13.512 8.21408 13.512 8.78393 13.8634 9.1354L17.3257 12.5976H12.9999C11.5849 12.5976 10.5778 12.5969 9.78916 12.5325C9.01106 12.4689 8.52526 12.3478 8.1385 12.1508C7.36704 11.7577 6.73982 11.1305 6.34674 10.359C6.14968 9.97223 6.02857 9.48644 5.965 8.70834C5.90057 7.91973 5.89987 6.91262 5.89987 5.49764V3.99765Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconArrowTurnDownRight;
