import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 뒤로가기, Chevron, Back, Left
 * 속성: Outlined
 */
const IconChevronLeftThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.4195 3.08022C16.9271 3.58791 16.9271 4.41102 16.4195 4.9187L9.3387 11.9995L16.4195 19.0802C16.9271 19.5879 16.9271 20.411 16.4195 20.9187C15.9118 21.4264 15.0887 21.4264 14.581 20.9187L6.58099 12.9187C6.07331 12.411 6.07331 11.5879 6.58099 11.0802L14.581 3.08022C15.0887 2.57254 15.9118 2.57254 16.4195 3.08022Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftThick;
