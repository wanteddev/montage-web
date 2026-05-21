import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.49998 4.6004C4.00292 4.6004 3.59998 5.00335 3.59998 5.5004C3.59998 5.99746 4.00292 6.4004 4.49998 6.4004H19.5C19.997 6.4004 20.4 5.99746 20.4 5.5004C20.4 5.00335 19.997 4.6004 19.5 4.6004H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M4.49998 8.93374C4.00292 8.93374 3.59998 9.33668 3.59998 9.83374C3.59998 10.3308 4.00292 10.7337 4.49998 10.7337H19.5C19.997 10.7337 20.4 10.3308 20.4 9.83374C20.4 9.33668 19.997 8.93374 19.5 8.93374H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M3.59998 14.1671C3.59998 13.67 4.00292 13.2671 4.49998 13.2671H19.5C19.997 13.2671 20.4 13.67 20.4 14.1671C20.4 14.6641 19.997 15.0671 19.5 15.0671H4.49998C4.00292 15.0671 3.59998 14.6641 3.59998 14.1671Z"
        fill="currentColor"
      />
      <path
        d="M4.49998 17.6004C4.00292 17.6004 3.59998 18.0033 3.59998 18.5004C3.59998 18.9975 4.00292 19.4004 4.49998 19.4004H19.5C19.997 19.4004 20.4 18.9975 20.4 18.5004C20.4 18.0033 19.997 17.6004 19.5 17.6004H4.49998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignJustify;
