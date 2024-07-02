import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCirclePlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.8999 7.99996C12.8999 7.50291 12.497 7.09996 11.9999 7.09996C11.5029 7.09996 11.0999 7.50291 11.0999 7.99996V11.0999H7.99996C7.50291 11.0999 7.09997 11.5029 7.09997 11.9999C7.09997 12.497 7.50291 12.8999 7.99996 12.8999H11.0999V15.9999C11.0999 16.497 11.5029 16.8999 11.9999 16.8999C12.497 16.8999 12.8999 16.497 12.8999 15.9999V12.8999H15.9999C16.497 12.8999 16.8999 12.497 16.8999 11.9999C16.8999 11.5029 16.497 11.0999 15.9999 11.0999H12.8999V7.99996Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.10009C6.53232 2.10009 2.09996 6.53245 2.09996 12C2.09996 17.4676 6.53232 21.9 11.9999 21.9C17.4675 21.9 21.8998 17.4676 21.8998 12C21.8998 6.53245 17.4675 2.10009 11.9999 2.10009ZM3.89996 12C3.89996 7.52655 7.52643 3.90008 11.9999 3.90008C16.4734 3.90008 20.0999 7.52655 20.0999 12C20.0999 16.4735 16.4734 20.1 11.9999 20.1C7.52643 20.1 3.89996 16.4735 3.89996 12Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
