import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 가운데 정렬을 표현합니다.
 * 키워드: Paragraph, 얼라인, 중앙정렬, Align
 * 속성: Outlined
 */
const IconAlignCenter = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.0001 8.93372C6.50304 8.93372 6.1001 9.33666 6.1001 9.83372C6.1001 10.3308 6.50304 10.7337 7.0001 10.7337H17.0001C17.4972 10.7337 17.9001 10.3308 17.9001 9.83372C17.9001 9.33666 17.4972 8.93372 17.0001 8.93372H7.0001Z"
        fill="currentColor"
      />
      <path
        d="M3.6001 14.167C3.6001 13.67 4.00304 13.267 4.5001 13.267H19.5001C19.9972 13.267 20.4001 13.67 20.4001 14.167C20.4001 14.6641 19.9972 15.067 19.5001 15.067H4.5001C4.00304 15.067 3.6001 14.6641 3.6001 14.167Z"
        fill="currentColor"
      />
      <path
        d="M7.0001 17.6003C6.50304 17.6003 6.1001 18.0033 6.1001 18.5003C6.1001 18.9974 6.50304 19.4003 7.0001 19.4003H17.0001C17.4972 19.4003 17.9001 18.9974 17.9001 18.5003C17.9001 18.0033 17.4972 17.6003 17.0001 17.6003H7.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignCenter;
