import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 한정된 공간에 추가 요소를 표시할 때 사용합니다.
 * 키워드: More, 3dots, See More, 추가, 땡땡땡, Tight
 * 속성: Outlined
 */
const IconMoreVerticalTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      ref={ref}
      {...props}
    >
      <path
        d="M7.74967 18.75C7.74967 17.7835 6.96617 17 5.99967 17C5.03317 17 4.24966 17.7835 4.24966 18.75C4.24966 19.7165 5.03317 20.5 5.99967 20.5C6.96617 20.5 7.74967 19.7165 7.74967 18.75Z"
        fill="currentColor"
      />
      <path
        d="M5.99967 10.25C6.96617 10.25 7.74967 11.0335 7.74967 12C7.74967 12.9665 6.96617 13.75 5.99967 13.75C5.03317 13.75 4.24966 12.9665 4.24966 12C4.24966 11.0335 5.03317 10.25 5.99967 10.25Z"
        fill="currentColor"
      />
      <path
        d="M5.99967 3.5C6.96617 3.5 7.74967 4.2835 7.74967 5.25C7.74967 6.2165 6.96617 7 5.99967 7C5.03317 7 4.24966 6.2165 4.24966 5.25C4.24966 4.2835 5.03317 3.5 5.99967 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVerticalTight;
