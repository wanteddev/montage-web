import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 양끝 정렬을 표현합니다.
 * 키워드: Paragraph, 얼라인, Align, 양끝 정렬
 * 속성: Outlined
 */
const IconAlignJustify = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.5001 4.60039C4.00304 4.60039 3.6001 5.00333 3.6001 5.50039C3.6001 5.99744 4.00304 6.40039 4.5001 6.40039H19.5001C19.9972 6.40039 20.4001 5.99744 20.4001 5.50039C20.4001 5.00333 19.9972 4.60039 19.5001 4.60039H4.5001Z"
        fill="currentColor"
      />
      <path
        d="M4.5001 8.93372C4.00304 8.93372 3.6001 9.33666 3.6001 9.83372C3.6001 10.3308 4.00304 10.7337 4.5001 10.7337H19.5001C19.9972 10.7337 20.4001 10.3308 20.4001 9.83372C20.4001 9.33666 19.9972 8.93372 19.5001 8.93372H4.5001Z"
        fill="currentColor"
      />
      <path
        d="M3.6001 14.1671C3.6001 13.67 4.00304 13.2671 4.5001 13.2671H19.5001C19.9972 13.2671 20.4001 13.67 20.4001 14.1671C20.4001 14.6641 19.9972 15.0671 19.5001 15.0671H4.5001C4.00304 15.0671 3.6001 14.6641 3.6001 14.1671Z"
        fill="currentColor"
      />
      <path
        d="M4.5001 17.6004C4.00304 17.6004 3.6001 18.0033 3.6001 18.5004C3.6001 18.9974 4.00304 19.4004 4.5001 19.4004H19.5001C19.9972 19.4004 20.4001 18.9974 20.4001 18.5004C20.4001 18.0033 19.9972 17.6004 19.5001 17.6004H4.5001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignJustify;
