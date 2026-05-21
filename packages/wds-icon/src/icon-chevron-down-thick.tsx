import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 방향의 꺾쇠를 표현합니다. 굵기와 사이즈 옵션을 조절할 수 있습니다.
 * 키워드: Thick, Chevron, Arrow, Down, Bottom, 꺾쇠, 아래, 화살표, 표시, 하단
 * 속성: Outlined
 */
const IconChevronDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.08093 7.58071C3.58861 7.07303 4.41172 7.07303 4.9194 7.58071L12.0002 14.6615L19.0809 7.58071C19.5886 7.07303 20.4117 7.07303 20.9194 7.58071C21.4271 8.08839 21.4271 8.91151 20.9194 9.41919L12.9194 17.4192C12.4117 17.9269 11.5886 17.9269 11.0809 17.4192L3.08093 9.41919C2.57324 8.91151 2.57324 8.08839 3.08093 7.58071Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDownThick;
