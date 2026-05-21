import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: 오른쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Right
 * 속성: Outlined
 */
const IconChevronDoubleRight = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.86382 4.63991C2.51235 4.28844 2.51235 3.71859 2.86382 3.36712C3.2153 3.01565 3.78514 3.01565 4.13662 3.36712L12.1366 11.3671C12.4881 11.7186 12.4881 12.2884 12.1366 12.6399L4.13662 20.6399C3.78514 20.9914 3.2153 20.9914 2.86382 20.6399C2.51235 20.2884 2.51235 19.7186 2.86382 19.3671L10.2274 12.0035L2.86382 4.63991ZM12.3638 4.63991C12.0124 4.28844 12.0124 3.71859 12.3638 3.36712C12.7153 3.01565 13.2851 3.01565 13.6366 3.36712L21.6366 11.3671C21.9881 11.7186 21.9881 12.2884 21.6366 12.6399L13.6366 20.6399C13.2851 20.9914 12.7153 20.9914 12.3638 20.6399C12.0124 20.2884 12.0124 19.7186 12.3638 19.3671L19.7274 12.0035L12.3638 4.63991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRight;
