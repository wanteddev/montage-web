import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M1.58065 3.07998C1.07297 3.58766 1.07297 4.41078 1.58065 4.91846L8.66141 11.9992L1.58065 19.08C1.07297 19.5877 1.07297 20.4108 1.58065 20.9185C2.08833 21.4261 2.91145 21.4261 3.41913 20.9185L11.4191 12.9185C11.9268 12.4108 11.9268 11.5877 11.4191 11.08L3.41913 3.07998C2.91145 2.5723 2.08833 2.5723 1.58065 3.07998Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronRightTightThick;
