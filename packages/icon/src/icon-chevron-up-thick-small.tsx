import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Thick, Chevron, Arrow, Up, Top, 꺾쇠, 위, 화살표, 표시, 상단, Small
 * 속성: Outlined
 */
const IconChevronUpThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08047 15.9192C4.58815 16.4269 5.41126 16.4269 5.91895 15.9192L11.9997 9.83843L18.0805 15.9192C18.5881 16.4269 19.4113 16.4269 19.9189 15.9192C20.4266 15.4115 20.4266 14.5884 19.9189 14.0807L12.9189 7.08071C12.4113 6.57303 11.5881 6.57303 11.0805 7.08071L4.08047 14.0807C3.57279 14.5884 3.57279 15.4115 4.08047 15.9192Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronUpThickSmall;
