import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleExclamation = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 15.9998C12.9999 16.5521 12.5522 16.9998 11.9999 16.9998C11.4476 16.9998 10.9999 16.5521 10.9999 15.9998C10.9999 15.4475 11.4476 14.9998 11.9999 14.9998C12.5522 14.9998 12.9999 15.4475 12.9999 15.9998Z"
        fill="currentColor"
      />
      <path
        d="M12.9 7.99984C12.9 7.50278 12.4971 7.09984 12 7.09984C11.5029 7.09984 11.1 7.50278 11.1 7.99984V12.4998C11.1 12.9969 11.5029 13.3998 12 13.3998C12.4971 13.3998 12.9 12.9969 12.9 12.4998V7.99984Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09996 11.9999C2.09996 6.53232 6.53232 2.09996 11.9999 2.09996C17.4675 2.09996 21.8998 6.53232 21.8998 11.9999C21.8998 17.4675 17.4675 21.8999 11.9999 21.8999C6.53232 21.8999 2.09996 17.4675 2.09996 11.9999ZM11.9999 3.89996C7.52643 3.89996 3.89996 7.52643 3.89996 11.9999C3.89996 16.4734 7.52643 20.0999 11.9999 20.0999C16.4734 20.0999 20.0999 16.4734 20.0999 11.9999C20.0999 7.52643 16.4734 3.89996 11.9999 3.89996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleExclamation;
