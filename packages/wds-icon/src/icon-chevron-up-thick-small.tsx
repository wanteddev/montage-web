import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M4.08065 15.9192C4.58833 16.4269 5.41145 16.4269 5.91913 15.9192L11.9999 9.83843L18.0807 15.9192C18.5883 16.4269 19.4114 16.4269 19.9191 15.9192C20.4268 15.4115 20.4268 14.5884 19.9191 14.0807L12.9191 7.08071C12.4114 6.57303 11.5883 6.57303 11.0807 7.08071L4.08065 14.0807C3.57297 14.5884 3.57297 15.4115 4.08065 15.9192Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronUpThickSmall;
