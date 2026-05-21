import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.49985 4.60034C4.0028 4.60034 3.59985 5.00329 3.59985 5.50034C3.59985 5.9974 4.0028 6.40034 4.49985 6.40034H19.4999C19.9969 6.40034 20.3999 5.9974 20.3999 5.50034C20.3999 5.00329 19.9969 4.60034 19.4999 4.60034H4.49985Z"
        fill="currentColor"
      />
      <path
        d="M4.49985 8.93366C4.0028 8.93366 3.59985 9.3366 3.59985 9.83366C3.59985 10.3307 4.0028 10.7337 4.49985 10.7337H14.4999C14.9969 10.7337 15.3999 10.3307 15.3999 9.83366C15.3999 9.3366 14.9969 8.93366 14.4999 8.93366H4.49985Z"
        fill="currentColor"
      />
      <path
        d="M3.59985 14.167C3.59985 13.6699 4.0028 13.267 4.49985 13.267H19.4999C19.9969 13.267 20.3999 13.6699 20.3999 14.167C20.3999 14.664 19.9969 15.067 19.4999 15.067H4.49985C4.0028 15.067 3.59985 14.664 3.59985 14.167Z"
        fill="currentColor"
      />
      <path
        d="M4.49985 17.6003C4.0028 17.6003 3.59985 18.0032 3.59985 18.5003C3.59985 18.9973 4.0028 19.4003 4.49985 19.4003H14.4999C14.9969 19.4003 15.3999 18.9973 15.3999 18.5003C15.3999 18.0032 14.9969 17.6003 14.4999 17.6003H4.49985Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignLeft;
