import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M3.3637 7.36346C3.71517 7.01199 4.28502 7.01199 4.63649 7.36346L12.0001 14.7271L19.3637 7.36346C19.7152 7.01199 20.285 7.01199 20.6365 7.36346C20.988 7.71493 20.988 8.28478 20.6365 8.63625L12.6365 16.6362C12.285 16.9877 11.7152 16.9877 11.3637 16.6362L3.3637 8.63625C3.01223 8.28478 3.01223 7.71493 3.3637 7.36346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
