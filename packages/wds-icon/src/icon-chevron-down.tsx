import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Chevron, Arrow, Down, Bottom, 꺾쇠, 아래, 화살표, 표시, 하단
 * 속성: Outlined
 */
const IconChevronDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.36364 7.36346C3.71511 7.01199 4.28496 7.01199 4.63643 7.36346L12 14.7271L19.3636 7.36346C19.7151 7.01199 20.285 7.01199 20.6364 7.36346C20.9879 7.71493 20.9879 8.28478 20.6364 8.63625L12.6364 16.6362C12.285 16.9877 11.7151 16.9877 11.3636 16.6362L3.36364 8.63625C3.01217 8.28478 3.01217 7.71493 3.36364 7.36346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
