import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정상적으로 확인된 상태를 표현합니다.
 * 키워드: 체크, 확인, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCircleCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.6466 9.87555C16.9923 9.51839 16.983 8.94862 16.6258 8.60292C16.2687 8.25723 15.6989 8.26652 15.3532 8.62367L10.6773 13.4546L8.64746 11.3518C8.30225 10.9942 7.73249 10.9841 7.37487 11.3293C7.01724 11.6746 7.00718 12.2443 7.35239 12.6019L10.0288 15.3747C10.1983 15.5502 10.4318 15.6494 10.6758 15.6496C10.9198 15.6498 11.1534 15.5509 11.3231 15.3755L16.6466 9.87555Z"
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

export default IconCircleCheck;
