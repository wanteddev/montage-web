import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconEyeSlashFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1292 18.1295L18.7635 20.7638L20.0363 19.491L3.77281 3.22754L2.50002 4.50033L5.28595 7.28626C3.7591 8.40074 2.51974 9.88553 1.69998 11.6085C1.58202 11.8564 1.58202 12.1442 1.69998 12.3921C3.53087 16.2403 7.45481 18.9003 12 18.9003C13.4563 18.9003 14.8488 18.6272 16.1292 18.1295ZM13.5708 15.5711L12.0978 14.0981C12.0654 14.0996 12.0328 14.1004 12 14.1004C10.8402 14.1004 9.90002 13.1602 9.90002 12.0004C9.90002 11.9676 9.90077 11.935 9.90225 11.9026L8.42926 10.4296C8.21756 10.9101 8.10002 11.4415 8.10002 12.0004C8.10002 14.1543 9.84611 15.9004 12 15.9004C12.5589 15.9004 13.0902 15.7828 13.5708 15.5711ZM15.8226 12.7773L19.3012 16.2558C20.5596 15.2053 21.5881 13.8885 22.3001 12.3921C22.418 12.1442 22.418 11.8564 22.3001 11.6085C20.4692 7.76032 16.5452 5.10034 12 5.10034C10.833 5.10034 9.707 5.27569 8.64684 5.60148L11.2231 8.17775C11.4742 8.127 11.734 8.10037 12 8.10037C14.1539 8.10037 15.9 9.84646 15.9 12.0004C15.9 12.2664 15.8734 12.5262 15.8226 12.7773Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeSlashFill;
