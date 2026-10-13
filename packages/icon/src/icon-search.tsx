import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 검색 관련 정보를 표현하고 싶을 때 사용합니다.
 * 키워드: Find, 돋보기, 찾기, Search
 * 속성: Outlined
 */
const IconSearch = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.99958 2.09961C5.63655 2.09961 2.09961 5.63656 2.09961 9.99961C2.09961 14.3627 5.63655 17.8996 9.99958 17.8996C11.8569 17.8996 13.5645 17.2587 14.9133 16.1859L19.8633 21.136C20.2148 21.4874 20.7846 21.4874 21.1361 21.136C21.4875 20.7845 21.4875 20.2146 21.1361 19.8632L16.186 14.9131C17.2587 13.5643 17.8995 11.8568 17.8995 9.99961C17.8995 5.63656 14.3626 2.09961 9.99958 2.09961ZM3.8996 9.99961C3.8996 6.63067 6.63065 3.89961 9.99958 3.89961C13.3685 3.89961 16.0996 6.63067 16.0996 9.99961C16.0996 13.3685 13.3685 16.0996 9.99958 16.0996C6.63065 16.0996 3.8996 13.3685 3.8996 9.99961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
