import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
          d="M2.8637 4.63991C2.51223 4.28844 2.51223 3.71859 2.8637 3.36712C3.21517 3.01565 3.78502 3.01565 4.13649 3.36712L12.1365 11.3671C12.488 11.7186 12.488 12.2884 12.1365 12.6399L4.13649 20.6399C3.78502 20.9914 3.21517 20.9914 2.8637 20.6399C2.51223 20.2884 2.51223 19.7186 2.8637 19.3671L10.2273 12.0035L2.8637 4.63991ZM12.3637 4.63991C12.0122 4.28844 12.0122 3.71859 12.3637 3.36712C12.7152 3.01565 13.285 3.01565 13.6365 3.36712L21.6365 11.3671C21.988 11.7186 21.988 12.2884 21.6365 12.6399L13.6365 20.6399C13.285 20.9914 12.7152 20.9914 12.3637 20.6399C12.0122 20.2884 12.0122 19.7186 12.3637 19.3671L19.7273 12.0035L12.3637 4.63991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRight;
