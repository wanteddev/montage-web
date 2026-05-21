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
        d="M12 2.1001C6.5324 2.1001 2.10004 6.53248 2.10004 12.0001C2.10004 17.4677 6.5324 21.9001 12 21.9001C17.4676 21.9001 21.9 17.4677 21.9 12.0001C21.9 6.53248 17.4676 2.1001 12 2.1001ZM11.4999 6.09951C11.997 6.09951 12.3999 6.50246 12.3999 6.99951V12.1268L14.7146 14.4415C15.0661 14.793 15.0661 15.3629 14.7146 15.7143C14.3631 16.0658 13.7933 16.0658 13.4418 15.7143L10.8634 13.1359C10.6839 12.9564 10.596 12.7199 10.5999 12.4846V6.99951C10.5999 6.50246 11.0028 6.09951 11.4999 6.09951Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClockFill;
