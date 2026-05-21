import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M4.3634 15.6365C4.71487 15.988 5.28472 15.988 5.63619 15.6365L11.9998 9.27289L18.3634 15.6365C18.7149 15.988 19.2847 15.988 19.6362 15.6365C19.9877 15.285 19.9877 14.7152 19.6362 14.3637L12.6362 7.3637C12.2847 7.01223 11.7149 7.01223 11.3634 7.3637L4.3634 14.3637C4.01192 14.7152 4.01192 15.285 4.3634 15.6365Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronUpSmall;
