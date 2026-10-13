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
 * 속성: Solid
 */
const IconClockFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0001 2.1001C6.53246 2.1001 2.1001 6.53248 2.1001 12.0001C2.1001 17.4677 6.53246 21.9001 12.0001 21.9001C17.4677 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4677 2.1001 12.0001 2.1001ZM11.5 6.09951C11.997 6.09951 12.4 6.50246 12.4 6.99951V12.1268L14.7147 14.4415C15.0661 14.793 15.0661 15.3629 14.7147 15.7143C14.3632 16.0658 13.7933 16.0658 13.4419 15.7143L10.8634 13.1359C10.6839 12.9564 10.5961 12.7199 10.6 12.4846V6.99951C10.6 6.50246 11.0029 6.09951 11.5 6.09951Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
