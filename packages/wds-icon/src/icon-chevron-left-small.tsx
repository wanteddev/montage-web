import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 뒤로가기, Chevron, Back, Left, Size, Tight, Small
 * 속성: Outlined
 */
const IconChevronLeftSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.1366 4.8637C15.4881 5.21517 15.4881 5.78502 15.1366 6.13649L9.27301 12.0001L15.1366 17.8637C15.4881 18.2152 15.4881 18.785 15.1366 19.1365C14.7851 19.488 14.2153 19.488 13.8638 19.1365L7.36382 12.6365C7.01235 12.285 7.01235 11.7152 7.36382 11.3637L13.8638 4.8637C14.2153 4.51223 14.7851 4.51223 15.1366 4.8637Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronLeftSmall;
