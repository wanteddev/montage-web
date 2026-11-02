import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 뒤로가기, Chevron, Back, Left, Tight, Small
 * 속성: Outlined
 */
const IconChevronLeftTightSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M9.13601 4.8637C9.48748 5.21517 9.48748 5.78502 9.13601 6.13649L3.2724 12.0001L9.13601 17.8637C9.48748 18.2152 9.48748 18.785 9.13601 19.1365C8.78454 19.488 8.21469 19.488 7.86321 19.1365L1.36321 12.6365C1.01174 12.285 1.01174 11.7152 1.36321 11.3637L7.86322 4.8637C8.21469 4.51223 8.78454 4.51223 9.13601 4.8637Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftTightSmall;
