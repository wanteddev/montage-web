import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
          d="M10.4189 3.07998C10.9266 3.58766 10.9266 4.41078 10.4189 4.91846L3.33818 11.9992L10.4189 19.08C10.9266 19.5877 10.9266 20.4108 10.4189 20.9185C9.91126 21.4261 9.08815 21.4261 8.58047 20.9185L0.580468 12.9185C0.0727868 12.4108 0.0727868 11.5877 0.580468 11.08L8.58047 3.07998C9.08815 2.5723 9.91127 2.5723 10.4189 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThick;
