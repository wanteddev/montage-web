import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.49998 4.6004C4.00292 4.6004 3.59998 5.00335 3.59998 5.5004C3.59998 5.99746 4.00292 6.4004 4.49998 6.4004H19.5C19.997 6.4004 20.4 5.99746 20.4 5.5004C20.4 5.00335 19.997 4.6004 19.5 4.6004H4.49998Z"
        fill="currentColor"
      />
      <path
        d="M6.99998 8.93373C6.50292 8.93373 6.09998 9.33667 6.09998 9.83373C6.09998 10.3308 6.50292 10.7337 6.99998 10.7337H17C17.497 10.7337 17.9 10.3308 17.9 9.83373C17.9 9.33667 17.497 8.93373 17 8.93373H6.99998Z"
        fill="currentColor"
      />
      <path
        d="M3.59998 14.167C3.59998 13.67 4.00292 13.267 4.49998 13.267H19.5C19.997 13.267 20.4 13.67 20.4 14.167C20.4 14.6641 19.997 15.067 19.5 15.067H4.49998C4.00292 15.067 3.59998 14.6641 3.59998 14.167Z"
        fill="currentColor"
      />
      <path
        d="M6.99998 17.6004C6.50292 17.6004 6.09998 18.0033 6.09998 18.5004C6.09998 18.9974 6.50292 19.4004 6.99998 19.4004H17C17.497 19.4004 17.9 18.9974 17.9 18.5004C17.9 18.0033 17.497 17.6004 17 17.6004H6.99998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignCenter;
