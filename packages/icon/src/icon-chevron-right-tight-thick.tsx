import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Tight
 * 속성: Outlined
 */
const IconChevronRightTightThick = forwardRef<SVGSVGElement, Props>(
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
          d="M1.58047 3.07998C1.07279 3.58766 1.07279 4.41078 1.58047 4.91846L8.66123 11.9992L1.58047 19.08C1.07279 19.5877 1.07279 20.4108 1.58047 20.9185C2.08815 21.4261 2.91127 21.4261 3.41895 20.9185L11.4189 12.9185C11.9266 12.4108 11.9266 11.5877 11.4189 11.08L3.41895 3.07998C2.91126 2.5723 2.08815 2.5723 1.58047 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThick;
