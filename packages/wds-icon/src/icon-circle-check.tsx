import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.6466 9.87603C16.9923 9.51888 16.983 8.94911 16.6259 8.60341C16.2687 8.25772 15.6989 8.26701 15.3532 8.62416L10.6773 13.4551L8.64745 11.3523C8.30224 10.9947 7.73248 10.9846 7.37486 11.3298C7.01723 11.675 7.00717 12.2448 7.35238 12.6024L10.0288 15.3752C10.1983 15.5507 10.4318 15.6499 10.6758 15.6501C10.9198 15.6503 11.1534 15.5514 11.3231 15.376L16.6466 9.87603Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.1001C6.5323 2.1001 2.09991 6.53248 2.09991 12.0001C2.09991 17.4677 6.5323 21.9001 11.9999 21.9001C17.4675 21.9001 21.8999 17.4677 21.8999 12.0001C21.8999 6.53248 17.4675 2.1001 11.9999 2.1001ZM3.89991 12.0001C3.89991 7.52659 7.52641 3.9001 11.9999 3.9001C16.4734 3.9001 20.0999 7.52659 20.0999 12.0001C20.0999 16.4736 16.4734 20.1001 11.9999 20.1001C7.52641 20.1001 3.89991 16.4736 3.89991 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheck;
