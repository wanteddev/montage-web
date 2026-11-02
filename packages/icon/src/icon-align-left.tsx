import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 정렬을 표현합니다.
 * 키워드: Paragraph, 얼라인, Align, Left Align, 왼쪽 정렬, Right
 * 속성: Outlined
 */
const IconAlignLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49961 4.60039C4.00255 4.60039 3.59961 5.00333 3.59961 5.50039C3.59961 5.99744 4.00255 6.40039 4.49961 6.40039H19.4996C19.9967 6.40039 20.3996 5.99744 20.3996 5.50039C20.3996 5.00333 19.9967 4.60039 19.4996 4.60039H4.49961Z"
        fill="currentColor"
      />
      <path
        d="M4.49961 8.9337C4.00255 8.9337 3.59961 9.33665 3.59961 9.8337C3.59961 10.3308 4.00255 10.7337 4.49961 10.7337H14.4996C14.9967 10.7337 15.3996 10.3308 15.3996 9.8337C15.3996 9.33665 14.9967 8.9337 14.4996 8.9337H4.49961Z"
        fill="currentColor"
      />
      <path
        d="M3.59961 14.167C3.59961 13.67 4.00255 13.267 4.49961 13.267H19.4996C19.9967 13.267 20.3996 13.67 20.3996 14.167C20.3996 14.6641 19.9967 15.067 19.4996 15.067H4.49961C4.00255 15.067 3.59961 14.6641 3.59961 14.167Z"
        fill="currentColor"
      />
      <path
        d="M4.49961 17.6003C4.00255 17.6003 3.59961 18.0033 3.59961 18.5003C3.59961 18.9974 4.00255 19.4003 4.49961 19.4003H14.4996C14.9967 19.4003 15.3996 18.9974 15.3996 18.5003C15.3996 18.0033 14.9967 17.6003 14.4996 17.6003H4.49961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignLeft;
