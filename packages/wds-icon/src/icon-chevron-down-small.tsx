import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.36337 8.3637C4.71484 8.01223 5.28469 8.01223 5.63616 8.3637L11.9998 14.7273L18.3634 8.3637C18.7148 8.01223 19.2847 8.01223 19.6362 8.3637C19.9876 8.71517 19.9876 9.28502 19.6362 9.63649L12.6362 16.6365C12.2847 16.988 11.7148 16.988 11.3634 16.6365L4.36337 9.63649C4.01189 9.28502 4.01189 8.71517 4.36337 8.3637Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownSmall;
