import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 에디터 등에서 코드 에디터를 여는 기능을 지칭할 때 사용합니다.
 * 키워드: 코드, 에디터, Editor, Code
 * 속성: Outlined
 */
const IconCode = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2182 3.12669C14.7004 3.24725 14.9936 3.73589 14.8731 4.2181L10.8731 20.2181C10.7525 20.7003 10.2639 20.9935 9.78169 20.873C9.29947 20.7524 9.00629 20.2638 9.12684 19.7815L13.1268 3.78154C13.2474 3.29932 13.736 3.00614 14.2182 3.12669Z"
        fill="currentColor"
      />
      <path
        d="M16.3635 6.36343C16.0121 6.7149 16.0121 7.28475 16.3635 7.63622L20.7271 11.9998L16.3635 16.3634C16.0121 16.7149 16.0121 17.2847 16.3635 17.6362C16.715 17.9877 17.2849 17.9877 17.6363 17.6362L22.6363 12.6362C22.9878 12.2847 22.9878 11.7149 22.6363 11.3634L17.6363 6.36343C17.2849 6.01195 16.715 6.01195 16.3635 6.36343Z"
        fill="currentColor"
      />
      <path
        d="M7.63647 7.63622C7.98794 7.28475 7.98794 6.7149 7.63647 6.36343C7.285 6.01195 6.71515 6.01195 6.36368 6.36343L1.3637 11.3634C1.01223 11.7149 1.01223 12.2847 1.3637 12.6362L6.36368 17.6362C6.71515 17.9877 7.285 17.9877 7.63647 17.6362C7.98794 17.2847 7.98794 16.7149 7.63647 16.3634L3.27288 11.9998L7.63647 7.63622Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCode;
