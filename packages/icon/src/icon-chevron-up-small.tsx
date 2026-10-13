import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Chevron, Arrow, Up, Top, 꺾쇠, 위, 화살표, 표시, 상단, Small
 * 속성: Outlined
 */
const IconChevronUpSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.36321 15.6365C4.71469 15.988 5.28453 15.988 5.63601 15.6365L11.9996 9.27289L18.3632 15.6365C18.7147 15.988 19.2845 15.988 19.636 15.6365C19.9875 15.285 19.9875 14.7152 19.636 14.3637L12.636 7.3637C12.2845 7.01223 11.7147 7.01223 11.3632 7.3637L4.36321 14.3637C4.01174 14.7152 4.01174 15.285 4.36321 15.6365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
