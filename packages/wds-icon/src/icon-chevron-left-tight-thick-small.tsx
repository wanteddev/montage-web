import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 뒤로가기, Chevron, Back, Left, Tight, Small
 * 속성: Outlined
 */
const IconChevronLeftTightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M9.41895 4.58071C9.92663 5.08839 9.92663 5.91151 9.41895 6.41919L3.83819 12L9.41895 17.5807C9.92663 18.0884 9.92663 18.9115 9.41895 19.4192C8.91127 19.9269 8.08815 19.9269 7.58047 19.4192L1.08047 12.9192C0.572786 12.4115 0.572787 11.5884 1.08047 11.0807L7.58047 4.58071C8.08815 4.07303 8.91127 4.07303 9.41895 4.58071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightThickSmall;
