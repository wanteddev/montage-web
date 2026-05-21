import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M9.63631 8.36409C9.28484 8.01262 8.715 8.01262 8.36352 8.36409C8.01205 8.71556 8.01205 9.28541 8.36352 9.63688L10.7271 12.0005L8.36352 14.3641C8.01205 14.7156 8.01205 15.2854 8.36352 15.6369C8.715 15.9884 9.28484 15.9884 9.63631 15.6369L11.9999 13.2733L14.3635 15.6369C14.715 15.9884 15.2848 15.9884 15.6363 15.6369C15.9878 15.2854 15.9878 14.7156 15.6363 14.3641L13.2727 12.0005L15.6363 9.63688C15.9878 9.28541 15.9878 8.71556 15.6363 8.36409C15.2848 8.01262 14.715 8.01262 14.3635 8.36409L11.9999 10.7277L9.63631 8.36409Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.1001C6.53231 2.1001 2.09995 6.53248 2.09995 12.0001C2.09995 17.4677 6.53231 21.9001 11.9999 21.9001C17.4675 21.9001 21.8999 17.4677 21.8999 12.0001C21.8999 6.53248 17.4675 2.1001 11.9999 2.1001ZM3.89994 12.0001C3.89994 7.52659 7.52642 3.9001 11.9999 3.9001C16.4734 3.9001 20.0999 7.52659 20.0999 12.0001C20.0999 16.4736 16.4734 20.1001 11.9999 20.1001C7.52642 20.1001 3.89994 16.4736 3.89994 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
