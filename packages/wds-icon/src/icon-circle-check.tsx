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
        d="M16.6466 9.876C16.9923 9.51884 16.983 8.94907 16.6258 8.60338C16.2687 8.25768 15.6989 8.26697 15.3532 8.62413L10.6773 13.4551L8.64745 11.3523C8.30224 10.9946 7.73248 10.9846 7.37486 11.3298C7.01724 11.675 7.00717 12.2448 7.35238 12.6024L10.0288 15.3751C10.1983 15.5506 10.4318 15.6499 10.6758 15.65C10.9198 15.6502 11.1534 15.5513 11.3231 15.376L16.6466 9.876Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.5323 2.10009 2.09994 6.53245 2.09994 12.0001C2.09994 17.4676 6.5323 21.9 11.9999 21.9C17.4675 21.9 21.8999 17.4676 21.8999 12.0001C21.8999 6.53245 17.4675 2.10009 11.9999 2.10009ZM3.89993 12.0001C3.89993 7.52656 7.52641 3.90008 11.9999 3.90008C16.4734 3.90008 20.0999 7.52656 20.0999 12.0001C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52641 20.1 3.89993 16.4735 3.89993 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheck;
