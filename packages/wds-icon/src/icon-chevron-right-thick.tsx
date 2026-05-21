import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 앞으로 가기, Chevron, Forward, Right
 * 속성: Outlined
 */
const IconChevronRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.58135 3.08022C7.07367 3.58791 7.07367 4.41102 7.58135 4.9187L14.6621 11.9995L7.58135 19.0802C7.07367 19.5879 7.07367 20.411 7.58135 20.9187C8.08904 21.4264 8.91215 21.4264 9.41983 20.9187L17.4198 12.9187C17.9275 12.411 17.9275 11.5879 17.4198 11.0802L9.41983 3.08022C8.91215 2.57254 8.08903 2.57254 7.58135 3.08022Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightThick;
