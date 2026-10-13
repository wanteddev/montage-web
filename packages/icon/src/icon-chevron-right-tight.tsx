import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Tight
 * 속성: Outlined
 */
const IconChevronRightTight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M1.86321 3.36272C1.51174 3.7142 1.51174 4.28405 1.86321 4.63552L9.22682 11.9991L1.86321 19.3627C1.51174 19.7142 1.51174 20.284 1.86321 20.6355C2.21469 20.987 2.78453 20.987 3.13601 20.6355L11.136 12.6355C11.4875 12.284 11.4875 11.7142 11.136 11.3627L3.13601 3.36272C2.78453 3.01125 2.21469 3.01125 1.86321 3.36272Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightTight;
