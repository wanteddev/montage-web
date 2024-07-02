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
        d="M2.0999 12C2.0999 6.53245 6.53226 2.10009 11.9998 2.10009C17.4674 2.10009 21.8998 6.53245 21.8998 12C21.8998 17.4676 17.4674 21.9 11.9998 21.9C6.53226 21.9 2.0999 17.4676 2.0999 12ZM12.8999 7.74996C12.8999 7.25291 12.4969 6.84997 11.9999 6.84997C11.5028 6.84997 11.0999 7.25291 11.0999 7.74996V11.0999H7.7499C7.25285 11.0999 6.8499 11.5029 6.8499 11.9999C6.8499 12.497 7.25285 12.8999 7.7499 12.8999H11.0999V16.2499C11.0999 16.747 11.5028 17.1499 11.9999 17.1499C12.4969 17.1499 12.8999 16.747 12.8999 16.2499V12.8999H16.2499C16.7469 12.8999 17.1499 12.497 17.1499 11.9999C17.1499 11.5029 16.7469 11.0999 16.2499 11.0999H12.8999V7.74996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusFill;
