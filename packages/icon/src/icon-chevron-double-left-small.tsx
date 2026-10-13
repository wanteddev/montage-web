import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: 왼쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Left, Small
 * 속성: Outlined
 */
const IconChevronDoubleLeftSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M11.6365 6.13991C11.988 5.78844 11.988 5.21859 11.6365 4.86712C11.285 4.51565 10.7152 4.51565 10.3637 4.86712L3.8637 11.3671C3.69492 11.5359 3.6001 11.7648 3.6001 12.0035C3.6001 12.2422 3.69492 12.4711 3.8637 12.6399L10.3637 19.1399C10.7152 19.4914 11.285 19.4914 11.6365 19.1399C11.988 18.7884 11.988 18.2186 11.6365 17.8671L5.77289 12.0035L11.6365 6.13991ZM19.6367 6.13991C19.9882 5.78844 19.9882 5.21859 19.6367 4.86712C19.2852 4.51565 18.7154 4.51565 18.3639 4.86712L11.8639 11.3671C11.6951 11.5359 11.6003 11.7648 11.6003 12.0035C11.6003 12.2422 11.6951 12.4711 11.8639 12.6399L18.3639 19.1399C18.7154 19.4914 19.2852 19.4914 19.6367 19.1399C19.9882 18.7884 19.9882 18.2186 19.6367 17.8671L13.7731 12.0035L19.6367 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftSmall;
