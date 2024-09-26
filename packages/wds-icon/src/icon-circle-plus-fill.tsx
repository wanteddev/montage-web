import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCirclePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.0999 11.9999C2.0999 6.53232 6.53226 2.09996 11.9998 2.09996C17.4674 2.09996 21.8998 6.53232 21.8998 11.9999C21.8998 17.4675 17.4674 21.8999 11.9998 21.8999C6.53226 21.8999 2.0999 17.4675 2.0999 11.9999ZM12.8999 7.74984C12.8999 7.25278 12.4969 6.84984 11.9999 6.84984C11.5028 6.84984 11.0999 7.25278 11.0999 7.74984V11.0998H7.7499C7.25285 11.0998 6.8499 11.5028 6.8499 11.9998C6.8499 12.4969 7.25285 12.8998 7.7499 12.8998H11.0999V16.2498C11.0999 16.7469 11.5028 17.1498 11.9999 17.1498C12.4969 17.1498 12.8999 16.7469 12.8999 16.2498V12.8998H16.2499C16.7469 12.8998 17.1499 12.4969 17.1499 11.9998C17.1499 11.5028 16.7469 11.0998 16.2499 11.0998H12.8999V7.74984Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusFill;
