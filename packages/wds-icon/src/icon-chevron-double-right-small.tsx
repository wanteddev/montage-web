import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
          d="M4.36358 6.13991C4.01211 5.78844 4.01211 5.21859 4.36358 4.86712C4.71505 4.51565 5.2849 4.51565 5.63637 4.86712L12.1364 11.3671C12.3052 11.5359 12.4 11.7648 12.4 12.0035C12.4 12.2422 12.3052 12.4711 12.1364 12.6399L5.63637 19.1399C5.2849 19.4914 4.71505 19.4914 4.36358 19.1399C4.01211 18.7884 4.01211 18.2186 4.36358 17.8671L10.2272 12.0035L4.36358 6.13991ZM12.3638 6.13991C12.0123 5.78844 12.0123 5.21859 12.3638 4.86712C12.7152 4.51565 13.2851 4.51565 13.6366 4.86712L20.1366 11.3671C20.3053 11.5359 20.4002 11.7648 20.4002 12.0035C20.4002 12.2422 20.3053 12.4711 20.1366 12.6399L13.6366 19.1399C13.2851 19.4914 12.7152 19.4914 12.3638 19.1399C12.0123 18.7884 12.0123 18.2186 12.3638 17.8671L18.2274 12.0035L12.3638 6.13991Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightSmall;
