import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 한정된 공간에 추가 요소를 표시할 때 사용합니다.
 * 키워드: More, 3dots, See More, 추가, 땡땡떙
 * 속성: Outlined
 */
const IconMoreVertical = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.7497 18.75C13.7497 17.7835 12.9662 17 11.9997 17C11.0332 17 10.2497 17.7835 10.2497 18.75C10.2497 19.7165 11.0332 20.5 11.9997 20.5C12.9662 20.5 13.7497 19.7165 13.7497 18.75Z"
        fill="currentColor"
      />
      <path
        d="M11.9997 10.25C12.9662 10.25 13.7497 11.0335 13.7497 12C13.7497 12.9665 12.9662 13.75 11.9997 13.75C11.0332 13.75 10.2497 12.9665 10.2497 12C10.2497 11.0335 11.0332 10.25 11.9997 10.25Z"
        fill="currentColor"
      />
      <path
        d="M11.9997 3.5C12.9662 3.5 13.7497 4.2835 13.7497 5.25C13.7497 6.2165 12.9662 7 11.9997 7C11.0332 7 10.2497 6.2165 10.2497 5.25C10.2497 4.2835 11.0332 3.5 11.9997 3.5Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoreVertical;
