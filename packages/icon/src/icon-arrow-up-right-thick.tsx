import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 위쪽 화살표를 표현합니다. 외부 링크로 연결되거나 새 창으로 이동을 표현합니다.
 * 키워드: Thick, 애로우, Arrow, 화살표, 꺽쇠, Outward, 오른쪽 위, 대각선, Right, External Link, 링크, 새창, New Window, 외부링크, 바로가기, 이동, 화살표
 * 속성: Outlined
 */
const IconArrowUpRightThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M17.392 5.30859C18.1099 5.30859 18.692 5.89062 18.692 6.60859L18.6919 16.5081C18.6919 17.226 18.1099 17.8081 17.3919 17.8081C16.674 17.8081 16.092 17.226 16.092 16.5081L16.092 9.74707L7.52783 18.3112C7.02015 18.8189 6.19703 18.8189 5.68935 18.3112C5.18167 17.8035 5.18167 16.9804 5.68936 16.4727L14.2535 7.90859L7.49249 7.90861C6.77452 7.90861 6.1925 7.32658 6.1925 6.60861C6.1925 5.89064 6.77453 5.30861 7.4925 5.30861L17.392 5.30859Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpRightThick;
