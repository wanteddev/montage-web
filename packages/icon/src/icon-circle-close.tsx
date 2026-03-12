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
        d="M9.63631 8.3636C9.28484 8.01213 8.715 8.01213 8.36352 8.3636C8.01205 8.71508 8.01205 9.28492 8.36352 9.6364L10.7271 12L8.36352 14.3636C8.01205 14.7151 8.01205 15.2849 8.36352 15.6364C8.715 15.9879 9.28484 15.9879 9.63631 15.6364L11.9999 13.2728L14.3635 15.6364C14.715 15.9879 15.2848 15.9879 15.6363 15.6364C15.9878 15.2849 15.9878 14.7151 15.6363 14.3636L13.2727 12L15.6363 9.6364C15.9878 9.28492 15.9878 8.71508 15.6363 8.3636C15.2848 8.01213 14.715 8.01213 14.3635 8.3636L11.9999 10.7272L9.63631 8.3636Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09961C6.53231 2.09961 2.09995 6.53199 2.09995 11.9996C2.09995 17.4672 6.53231 21.8996 11.9999 21.8996C17.4675 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53199 17.4675 2.09961 11.9999 2.09961ZM3.89994 11.9996C3.89994 7.5261 7.52642 3.89961 11.9999 3.89961C16.4734 3.89961 20.0999 7.5261 20.0999 11.9996C20.0999 16.4731 16.4734 20.0996 11.9999 20.0996C7.52642 20.0996 3.89994 16.4731 3.89994 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
