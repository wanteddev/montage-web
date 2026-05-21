import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M9.99973 2.09961C5.6367 2.09961 2.09976 5.63656 2.09976 9.99961C2.09976 14.3627 5.6367 17.8996 9.99973 17.8996C11.857 17.8996 13.5646 17.2587 14.9134 16.1859L19.8634 21.136C20.2149 21.4874 20.7848 21.4874 21.1362 21.136C21.4877 20.7845 21.4877 20.2146 21.1362 19.8632L16.1862 14.9131C17.2588 13.5643 17.8997 11.8568 17.8997 9.99961C17.8997 5.63656 14.3628 2.09961 9.99973 2.09961ZM3.89976 9.99961C3.89976 6.63067 6.63081 3.89961 9.99973 3.89961C13.3687 3.89961 16.0997 6.63067 16.0997 9.99961C16.0997 13.3685 13.3687 16.0996 9.99973 16.0996C6.63081 16.0996 3.89976 13.3685 3.89976 9.99961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
