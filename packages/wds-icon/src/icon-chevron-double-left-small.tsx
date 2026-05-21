import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M11.6364 6.13991C11.9878 5.78844 11.9878 5.21859 11.6364 4.86712C11.2849 4.51565 10.7151 4.51565 10.3636 4.86712L3.86358 11.3671C3.6948 11.5359 3.59998 11.7648 3.59998 12.0035C3.59998 12.2422 3.6948 12.4711 3.86358 12.6399L10.3636 19.1399C10.7151 19.4914 11.2849 19.4914 11.6364 19.1399C11.9878 18.7884 11.9878 18.2186 11.6364 17.8671L5.77277 12.0035L11.6364 6.13991ZM19.6366 6.13991C19.9881 5.78844 19.9881 5.21859 19.6366 4.86712C19.2851 4.51565 18.7153 4.51565 18.3638 4.86712L11.8638 11.3671C11.695 11.5359 11.6002 11.7648 11.6002 12.0035C11.6002 12.2422 11.695 12.4711 11.8638 12.6399L18.3638 19.1399C18.7153 19.4914 19.2851 19.4914 19.6366 19.1399C19.9881 18.7884 19.9881 18.2186 19.6366 17.8671L13.773 12.0035L19.6366 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleLeftSmall;
