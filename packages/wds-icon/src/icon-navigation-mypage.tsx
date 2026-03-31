import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 모바일 환경 하단의 내비게이션 바에 들어가는 아이콘입니다. 회원이 등록한 프로필 이미지가 있을 경우 그 이미지를 보여줍니다.
 * 키워드: 마이원티드, 마이페이지, My wanted page
 */
const IconNavigationMypage = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.9999 12C21.9999 17.5228 17.5228 22 12 22C6.47714 22 2 17.5228 2 12C2 6.47715 6.47714 2 12 2C17.5228 2 21.9999 6.47715 21.9999 12ZM11.9998 12.0001C13.8408 12.0001 15.3332 10.5077 15.3332 8.66678C15.3332 6.82583 13.8408 5.33345 11.9998 5.33345C10.1589 5.33345 8.66652 6.82583 8.66652 8.66678C8.66652 10.5077 10.1589 12.0001 11.9998 12.0001ZM12 13.6666C9.27503 13.6666 6.8667 14.9791 5.34588 16.9999C6.8667 19.0207 9.27919 20.3332 12 20.3332C14.7208 20.3332 17.1333 19.0207 18.6542 16.9999C17.1333 14.9791 14.7208 13.6666 12 13.6666Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationMypage;
