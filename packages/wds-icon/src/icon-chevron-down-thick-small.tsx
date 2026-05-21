import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M4.08062 8.08071C4.5883 7.57303 5.41142 7.57303 5.9191 8.08071L11.9999 14.1615L18.0806 8.08071C18.5883 7.57303 19.4114 7.57303 19.9191 8.08071C20.4268 8.58839 20.4268 9.41151 19.9191 9.91919L12.9191 16.9192C12.4114 17.4269 11.5883 17.4269 11.0806 16.9192L4.08062 9.91919C3.57294 9.41151 3.57294 8.58839 4.08062 8.08071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDownThickSmall;
