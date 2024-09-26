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
        d="M12.8999 7.99984C12.8999 7.50278 12.497 7.09984 11.9999 7.09984C11.5029 7.09984 11.0999 7.50278 11.0999 7.99984V11.0998H7.99996C7.50291 11.0998 7.09997 11.5028 7.09997 11.9998C7.09997 12.4969 7.50291 12.8998 7.99996 12.8998H11.0999V15.9998C11.0999 16.4969 11.5029 16.8998 11.9999 16.8998C12.497 16.8998 12.8999 16.4969 12.8999 15.9998V12.8998H15.9999C16.497 12.8998 16.8999 12.4969 16.8999 11.9998C16.8999 11.5028 16.497 11.0998 15.9999 11.0998H12.8999V7.99984Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09996C6.53232 2.09996 2.09996 6.53232 2.09996 11.9999C2.09996 17.4675 6.53232 21.8999 11.9999 21.8999C17.4675 21.8999 21.8998 17.4675 21.8998 11.9999C21.8998 6.53232 17.4675 2.09996 11.9999 2.09996ZM3.89996 11.9999C3.89996 7.52643 7.52643 3.89996 11.9999 3.89996C16.4734 3.89996 20.0999 7.52643 20.0999 11.9999C20.0999 16.4734 16.4734 20.0999 11.9999 20.0999C7.52643 20.0999 3.89996 16.4734 3.89996 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
