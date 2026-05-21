import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M17.3918 5.30859C18.1097 5.30859 18.6918 5.89062 18.6918 6.60859L18.6917 16.5081C18.6917 17.226 18.1097 17.8081 17.3917 17.8081C16.6738 17.8081 16.0917 17.226 16.0917 16.5081L16.0918 9.74707L7.52761 18.3112C7.01993 18.8189 6.19682 18.8189 5.68914 18.3112C5.18146 17.8035 5.18146 16.9804 5.68914 16.4727L14.2533 7.90859L7.49228 7.90861C6.77431 7.90861 6.19228 7.32658 6.19228 6.60861C6.19229 5.89064 6.77431 5.30861 7.49228 5.30861L17.3918 5.30859Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpRightThick;
