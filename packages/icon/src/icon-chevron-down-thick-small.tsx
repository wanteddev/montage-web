import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Thick, Chevron, Arrow, Down, Bottom, 꺾쇠, 아래, 화살표, 표시, 하단, Small
 * 속성: Outlined
 */
const IconChevronDownThickSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M4.08047 8.08071C4.58815 7.57303 5.41126 7.57303 5.91895 8.08071L11.9997 14.1615L18.0805 8.08071C18.5881 7.57303 19.4113 7.57303 19.9189 8.08071C20.4266 8.58839 20.4266 9.41151 19.9189 9.91919L12.9189 16.9192C12.4113 17.4269 11.5881 17.4269 11.0805 16.9192L4.08047 9.91919C3.57279 9.41151 3.57279 8.58839 4.08047 8.08071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDownThickSmall;
