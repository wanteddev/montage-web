import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M6.68759 4.37443C7.94507 2.88789 9.77446 2.1001 11.9997 2.1001C14.2249 2.1001 16.0543 2.88789 17.3118 4.37443C18.5519 5.84044 19.1497 7.8832 19.1497 10.2501L19.1497 11.0001C19.1497 13.4652 19.8329 14.9249 20.806 15.8682C21.1876 16.2381 21.2272 16.7499 21.0908 17.1264C20.9521 17.5094 20.572 17.9001 20.0001 17.9001H3.99928C3.42742 17.9001 3.04731 17.5094 2.90861 17.1264C2.77223 16.7499 2.81183 16.2381 3.19337 15.8682C4.16649 14.9249 4.84972 13.4652 4.84972 11.0001L4.84972 10.2501C4.84972 7.8832 5.44746 5.84044 6.68759 4.37443Z"
        fill="currentColor"
      />
      <path
        d="M9.09971 20.9999C9.09971 20.5029 9.50265 20.0999 9.99971 20.0999H13.9997C14.4967 20.0999 14.8997 20.5029 14.8997 20.9999C14.8997 21.497 14.4967 21.8999 13.9997 21.8999H9.99971C9.50265 21.8999 9.09971 21.497 9.09971 20.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBellFill;
