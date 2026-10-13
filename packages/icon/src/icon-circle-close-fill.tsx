import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 지울 때 사용합니다.
 * 키워드: Closed, Delete, 삭제, 제거, 닫기
 * 속성: Outlined
 */
const IconCircleCloseFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.10004 11.9996C2.10004 6.53199 6.5324 2.09961 12 2.09961C17.4676 2.09961 21.9 6.53199 21.9 11.9996C21.9 17.4672 17.4676 21.8996 12 21.8996C6.5324 21.8996 2.10004 17.4672 2.10004 11.9996ZM9.1364 7.86324C8.78493 7.51177 8.21508 7.51177 7.86361 7.86324C7.51214 8.21471 7.51214 8.78456 7.86361 9.13603L10.7272 11.9996L7.86361 14.8632C7.51214 15.2147 7.51214 15.7846 7.86361 16.136C8.21508 16.4875 8.78493 16.4875 9.1364 16.136L12 13.2724L14.8636 16.136C15.2151 16.4875 15.7849 16.4875 16.1364 16.136C16.4878 15.7846 16.4878 15.2147 16.1364 14.8632L13.2728 11.9996L16.1364 9.13603C16.4878 8.78456 16.4878 8.21471 16.1364 7.86324C15.7849 7.51177 15.2151 7.51177 14.8636 7.86324L12 10.7268L9.1364 7.86324Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCloseFill;
