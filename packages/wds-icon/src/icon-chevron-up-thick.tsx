import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Thick, Chevron, Arrow, Up, Top, 꺾쇠, 위, 화살표, 표시, 상단
 * 속성: Outlined
 */
const IconChevronUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08096 16.4192C3.58864 16.9269 4.41175 16.9269 4.91943 16.4192L12.0002 9.33843L19.081 16.4192C19.5886 16.9269 20.4118 16.9269 20.9194 16.4192C21.4271 15.9115 21.4271 15.0884 20.9194 14.5807L12.9194 6.58071C12.4118 6.07303 11.5886 6.07303 11.081 6.58071L3.08096 14.5807C2.57327 15.0884 2.57327 15.9115 3.08096 16.4192Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpThick;
