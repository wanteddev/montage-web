import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 뒤로가기, Chevron, Back, Left, Size
 * 속성: Outlined
 */
const IconChevronLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.1365 3.36297C16.488 3.71444 16.488 4.28429 16.1365 4.63576L8.77289 11.9994L16.1365 19.363C16.488 19.7144 16.488 20.2843 16.1365 20.6358C15.785 20.9872 15.2152 20.9872 14.8637 20.6358L6.8637 12.6358C6.51223 12.2843 6.51223 11.7144 6.8637 11.363L14.8637 3.36297C15.2152 3.0115 15.785 3.0115 16.1365 3.36297Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeft;
