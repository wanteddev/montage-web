import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Chevron, Arrow, Down, Bottom, 꺾쇠, 아래, 화살표, 표시, 하단, Small
 * 속성: Outlined
 */
const IconChevronDownSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36321 8.3637C4.71469 8.01223 5.28453 8.01223 5.63601 8.3637L11.9996 14.7273L18.3632 8.3637C18.7147 8.01223 19.2845 8.01223 19.636 8.3637C19.9875 8.71517 19.9875 9.28502 19.636 9.63649L12.636 16.6365C12.2845 16.988 11.7147 16.988 11.3632 16.6365L4.36321 9.63649C4.01174 9.28502 4.01174 8.71517 4.36321 8.3637Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
