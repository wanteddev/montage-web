import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 뒤로가기, Chevron, Back, Left, Size, Tight
 * 속성: Outlined
 */
const IconChevronLeftTightThick = forwardRef<SVGSVGElement, Props>(
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
          d="M10.4192 3.07998C10.9268 3.58766 10.9268 4.41078 10.4192 4.91846L3.3384 11.9992L10.4192 19.08C10.9268 19.5877 10.9268 20.4108 10.4192 20.9185C9.91148 21.4261 9.08836 21.4261 8.58068 20.9185L0.580681 12.9185C0.0730004 12.4108 0.0730004 11.5877 0.580681 11.08L8.58068 3.07998C9.08836 2.5723 9.91148 2.5723 10.4192 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThick;
