import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Chevron, Arrow, Up, Top, 꺾쇠, 위, 화살표, 표시, 상단
 * 속성: Outlined
 */
const IconChevronUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.36321 16.1365C3.71469 16.488 4.28453 16.488 4.63601 16.1365L11.9996 8.77289L19.3632 16.1365C19.7147 16.488 20.2845 16.488 20.636 16.1365C20.9875 15.785 20.9875 15.2152 20.636 14.8637L12.636 6.8637C12.2845 6.51223 11.7147 6.51223 11.3632 6.8637L3.36321 14.8637C3.01174 15.2152 3.01174 15.785 3.36321 16.1365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUp;
