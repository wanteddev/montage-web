import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 시간을 표현합니다.
 * 키워드: 시계, Clock
 * 속성: Outlined
 */
const IconClock = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.4999 6.59971C11.997 6.59971 12.3999 7.00265 12.3999 7.49971V12.127L14.6111 14.3382C14.9625 14.6897 14.9625 15.2595 14.6111 15.611C14.2596 15.9624 13.6897 15.9624 13.3383 15.611L10.8634 13.1361C10.6839 12.9566 10.596 12.7201 10.5999 12.4848V7.49971C10.5999 7.00265 11.0029 6.59971 11.4999 6.59971Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 2.1001C6.53246 2.1001 2.1001 6.53248 2.1001 12.0001C2.1001 17.4677 6.53246 21.9001 12.0001 21.9001C17.4677 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4677 2.1001 12.0001 2.1001ZM3.90009 12.0001C3.90009 7.52659 7.52657 3.9001 12.0001 3.9001C16.4735 3.9001 20.1 7.52659 20.1 12.0001C20.1 16.4736 16.4735 20.1001 12.0001 20.1001C7.52657 20.1001 3.90009 16.4736 3.90009 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
