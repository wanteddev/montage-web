import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M11.4999 6.59971C11.9969 6.59971 12.3998 7.00265 12.3998 7.49971V12.127L14.611 14.3382C14.9625 14.6897 14.9625 15.2595 14.611 15.611C14.2595 15.9624 13.6897 15.9624 13.3382 15.611L10.8633 13.1361C10.6838 12.9566 10.596 12.7201 10.5999 12.4848V7.49971C10.5999 7.00265 11.0028 6.59971 11.4999 6.59971Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.1001C6.5324 2.1001 2.10004 6.53248 2.10004 12.0001C2.10004 17.4677 6.5324 21.9001 12 21.9001C17.4676 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4676 2.1001 12 2.1001ZM3.90003 12.0001C3.90003 7.52659 7.52651 3.9001 12 3.9001C16.4735 3.9001 20.1 7.52659 20.1 12.0001C20.1 16.4736 16.4735 20.1001 12 20.1001C7.52651 20.1001 3.90003 16.4736 3.90003 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClock;
