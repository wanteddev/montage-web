import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 정렬을 표현합니다.
 * 키워드: Paragraph, 얼라인, Align, 오른쪽 정렬, Right
 * 속성: Outlined
 */
const IconAlignRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49961 4.6004C4.00255 4.6004 3.59961 5.00335 3.59961 5.5004C3.59961 5.99746 4.00255 6.4004 4.49961 6.4004H19.4996C19.9967 6.4004 20.3996 5.99746 20.3996 5.5004C20.3996 5.00335 19.9967 4.6004 19.4996 4.6004H4.49961Z"
        fill="currentColor"
      />
      <path
        d="M9.49961 8.93373C9.00255 8.93373 8.59961 9.33667 8.59961 9.83373C8.59961 10.3308 9.00255 10.7337 9.49961 10.7337H19.4996C19.9967 10.7337 20.3996 10.3308 20.3996 9.83373C20.3996 9.33667 19.9967 8.93373 19.4996 8.93373H9.49961Z"
        fill="currentColor"
      />
      <path
        d="M3.59961 14.167C3.59961 13.67 4.00255 13.267 4.49961 13.267H19.4996C19.9967 13.267 20.3996 13.67 20.3996 14.167C20.3996 14.6641 19.9967 15.067 19.4996 15.067H4.49961C4.00255 15.067 3.59961 14.6641 3.59961 14.167Z"
        fill="currentColor"
      />
      <path
        d="M9.49961 17.6004C9.00255 17.6004 8.59961 18.0033 8.59961 18.5004C8.59961 18.9974 9.00255 19.4004 9.49961 19.4004H19.4996C19.9967 19.4004 20.3996 18.9974 20.3996 18.5004C20.3996 18.0033 19.9967 17.6004 19.4996 17.6004H9.49961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignRight;
