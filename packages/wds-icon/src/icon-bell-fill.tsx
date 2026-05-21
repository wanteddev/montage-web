import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 새 정보와 관련한 내용을 표현할 때 사용합니다.
 * 키워드: 노티피케이션, 벨, 알람, Ring, Bell, Alarm Center, Notification, Noti, Notify
 * 속성: Solid
 */
const IconBellFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M6.68777 4.37443C7.94526 2.88789 9.77465 2.1001 11.9999 2.1001C14.2251 2.1001 16.0545 2.88789 17.312 4.37443C18.5521 5.84044 19.1498 7.8832 19.1498 10.2501L19.1498 11.0001C19.1498 13.4652 19.8331 14.9249 20.8062 15.8682C21.1877 16.2381 21.2273 16.7499 21.091 17.1264C20.9523 17.5094 20.5721 17.9001 20.0003 17.9001H3.99946C3.4276 17.9001 3.0475 17.5094 2.9088 17.1264C2.77241 16.7499 2.81201 16.2381 3.19356 15.8682C4.16667 14.9249 4.8499 13.4652 4.8499 11.0001L4.8499 10.2501C4.8499 7.8832 5.44764 5.84044 6.68777 4.37443Z"
        fill="currentColor"
      />
      <path
        d="M9.09989 20.9999C9.09989 20.5029 9.50284 20.0999 9.99989 20.0999H13.9999C14.4969 20.0999 14.8999 20.5029 14.8999 20.9999C14.8999 21.497 14.4969 21.8999 13.9999 21.8999H9.99989C9.50284 21.8999 9.09989 21.497 9.09989 20.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBellFill;
