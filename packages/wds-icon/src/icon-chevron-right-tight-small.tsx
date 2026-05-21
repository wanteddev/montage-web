import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Tight, Small
 * 속성: Outlined
 */
const IconChevronRightTightSmall = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
    return (
      <Box
        as="svg"
        viewBox="0 0 12 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        ref={ref}
        {...props}
      >
        <path
          d="M2.86364 4.86346C2.51217 5.21493 2.51217 5.78478 2.86364 6.13625L8.72725 11.9999L2.86364 17.8635C2.51217 18.2149 2.51217 18.7848 2.86364 19.1362C3.21511 19.4877 3.78496 19.4877 4.13643 19.1362L10.6364 12.6362C10.9879 12.2848 10.9879 11.7149 10.6364 11.3635L4.13643 4.86346C3.78496 4.51199 3.21511 4.51199 2.86364 4.86346Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightSmall;
