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
        d="M16.6466 9.87598C16.9923 9.51883 16.983 8.94906 16.6258 8.60337C16.2687 8.25767 15.6989 8.26696 15.3532 8.62412L10.6773 13.4551L8.64747 11.3523C8.30226 10.9946 7.7325 10.9846 7.37488 11.3298C7.01726 11.675 7.00719 12.2447 7.3524 12.6024L10.0289 15.3751C10.1983 15.5506 10.4318 15.6499 10.6758 15.65C10.9198 15.6502 11.1534 15.5513 11.3231 15.376L16.6466 9.87598Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.53232 2.10009 2.09996 6.53245 2.09996 12C2.09996 17.4676 6.53232 21.9 11.9999 21.9C17.4675 21.9 21.8999 17.4676 21.8999 12C21.8999 6.53245 17.4675 2.10009 11.9999 2.10009ZM3.89996 12C3.89996 7.52655 7.52643 3.90008 11.9999 3.90008C16.4734 3.90008 20.0999 7.52655 20.0999 12C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52643 20.1 3.89996 16.4735 3.89996 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheck;
