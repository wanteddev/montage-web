import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 텍스트의 두께를 표현합니다.
 * 키워드: Bold, 두께, B, B, 폰트, 볼드
 * 속성: Outlined
 */
const IconBold = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.64999 20.4999C7.80992 20.4999 7.38988 20.4999 7.06901 20.3364C6.78677 20.1926 6.5573 19.9631 6.41349 19.6808C6.25 19.36 6.25 18.9399 6.25 18.0999V5.8989C6.25 5.05882 6.25 4.63878 6.41349 4.31792C6.5573 4.03567 6.78677 3.8062 7.06901 3.66239C7.38988 3.4989 7.80992 3.4989 8.64999 3.4989H11.9395C15.1565 3.4989 17.2934 5.26005 17.2934 7.86655C17.2934 9.65118 16.2836 10.8957 14.4755 11.4593V11.5532C16.8355 12.0816 18.1622 13.5257 18.1622 15.6861C18.1622 18.5743 15.814 20.4999 12.3152 20.4999H8.64999ZM12.3387 18.5743C14.6869 18.5743 16.0488 17.4472 16.0488 15.5452C16.0488 13.6431 14.6164 12.516 12.1508 12.516H8.31641V18.5743H12.3387ZM11.7751 10.6374C13.9355 10.6374 15.18 9.67466 15.18 8.03092C15.18 6.38719 14.0059 5.42442 11.963 5.42442H8.31641V10.6374H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
