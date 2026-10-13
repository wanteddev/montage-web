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
const IconCircleClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.63637 8.3636C9.2849 8.01213 8.71506 8.01213 8.36359 8.3636C8.01211 8.71508 8.01211 9.28492 8.36358 9.6364L10.7272 12L8.36358 14.3636C8.01211 14.7151 8.01211 15.2849 8.36359 15.6364C8.71506 15.9879 9.2849 15.9879 9.63637 15.6364L12 13.2728L14.3636 15.6364C14.715 15.9879 15.2849 15.9879 15.6364 15.6364C15.9878 15.2849 15.9878 14.7151 15.6364 14.3636L13.2728 12L15.6364 9.6364C15.9878 9.28492 15.9878 8.71508 15.6364 8.3636C15.2849 8.01213 14.715 8.01213 14.3636 8.3636L12 10.7272L9.63637 8.3636Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.09961C6.53237 2.09961 2.10001 6.53199 2.10001 11.9996C2.10001 17.4672 6.53237 21.8996 12 21.8996C17.4676 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53199 17.4676 2.09961 12 2.09961ZM3.9 11.9996C3.9 7.5261 7.52648 3.89961 12 3.89961C16.4735 3.89961 20.0999 7.5261 20.0999 11.9996C20.0999 16.4731 16.4735 20.0996 12 20.0996C7.52648 20.0996 3.9 16.4731 3.9 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
