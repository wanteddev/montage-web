import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M8.64996 20.4999C7.80988 20.4999 7.38985 20.4999 7.06898 20.3364C6.78674 20.1926 6.55727 19.9631 6.41346 19.6808C6.24997 19.36 6.24997 18.9399 6.24997 18.0999V5.8989C6.24997 5.05882 6.24997 4.63878 6.41346 4.31792C6.55727 4.03567 6.78674 3.8062 7.06898 3.66239C7.38985 3.4989 7.80988 3.4989 8.64996 3.4989H11.9395C15.1565 3.4989 17.2933 5.26005 17.2933 7.86655C17.2933 9.65118 16.2836 10.8957 14.4755 11.4593V11.5532C16.8354 12.0816 18.1622 13.5257 18.1622 15.6861C18.1622 18.5743 15.814 20.4999 12.3152 20.4999H8.64996ZM12.3387 18.5743C14.6868 18.5743 16.0488 17.4472 16.0488 15.5452C16.0488 13.6431 14.6164 12.516 12.1508 12.516H8.31638V18.5743H12.3387ZM11.7751 10.6374C13.9354 10.6374 15.18 9.67466 15.18 8.03092C15.18 6.38719 14.0059 5.42442 11.9629 5.42442H8.31638V10.6374H11.7751Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBold;
