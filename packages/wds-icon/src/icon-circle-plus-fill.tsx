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
        d="M2.09994 12.0001C2.09994 6.53245 6.5323 2.10009 11.9999 2.10009C17.4675 2.10009 21.8998 6.53245 21.8998 12.0001C21.8998 17.4676 17.4675 21.9 11.9999 21.9C6.5323 21.9 2.09994 17.4676 2.09994 12.0001ZM12.8999 7.74997C12.8999 7.25292 12.497 6.84997 11.9999 6.84997C11.5029 6.84997 11.0999 7.25292 11.0999 7.74997V11.1H7.74994C7.25289 11.1 6.84994 11.5029 6.84994 12C6.84994 12.497 7.25289 12.9 7.74994 12.9H11.0999V16.2499C11.0999 16.747 11.5029 17.1499 11.9999 17.1499C12.497 17.1499 12.8999 16.747 12.8999 16.2499V12.9H16.2499C16.747 12.9 17.1499 12.497 17.1499 12C17.1499 11.5029 16.747 11.1 16.2499 11.1H12.8999V7.74997Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlusFill;
