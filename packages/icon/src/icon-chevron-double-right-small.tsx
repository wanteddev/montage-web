import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: 오른쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Right, Small, Big
 * 속성: Outlined
 */
const IconChevronDoubleRightSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.3637 6.13991C4.01223 5.78844 4.01223 5.21859 4.3637 4.86712C4.71517 4.51565 5.28502 4.51565 5.63649 4.86712L12.1365 11.3671C12.3053 11.5359 12.4001 11.7648 12.4001 12.0035C12.4001 12.2422 12.3053 12.4711 12.1365 12.6399L5.63649 19.1399C5.28502 19.4914 4.71517 19.4914 4.3637 19.1399C4.01223 18.7884 4.01223 18.2186 4.3637 17.8671L10.2273 12.0035L4.3637 6.13991ZM12.3639 6.13991C12.0124 5.78844 12.0124 5.21859 12.3639 4.86712C12.7154 4.51565 13.2852 4.51565 13.6367 4.86712L20.1367 11.3671C20.3055 11.5359 20.4003 11.7648 20.4003 12.0035C20.4003 12.2422 20.3055 12.4711 20.1367 12.6399L13.6367 19.1399C13.2852 19.4914 12.7154 19.4914 12.3639 19.1399C12.0124 18.7884 12.0124 18.2186 12.3639 17.8671L18.2275 12.0035L12.3639 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightSmall;
