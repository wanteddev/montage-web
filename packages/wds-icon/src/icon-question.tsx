import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 이해에 도움이 되는 정보를 표시할 때 사용합니다.
 * 키워드: 물음표, Question, Why, 왜, Additional Help
 * 속성: Outlined
 */
const IconQuestion = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9241 15.5214C11.3405 15.5214 10.8586 15.0444 10.9226 14.4643C11.4077 10.0619 14.9298 10.3711 14.9298 7.72543C14.9298 6.15213 13.6852 5.14241 11.9241 5.14241C10.417 5.14241 9.39359 5.86784 9.04775 7.14896C8.89565 7.71238 8.44533 8.19507 7.86174 8.19507C7.27815 8.19507 6.79341 7.71825 6.8883 7.14242C7.29135 4.69663 9.13518 3.16992 11.9241 3.16992C14.8593 3.16992 17.0432 4.86063 17.0432 7.72543C17.0432 11.2897 13.6467 11.0736 13.065 14.4671C12.9665 15.0423 12.5077 15.5214 11.9241 15.5214Z"
        fill="currentColor"
      />
      <path
        d="M10.4682 19.2313C10.4682 20.0766 11.0788 20.6872 11.9241 20.6872C12.7695 20.6872 13.38 20.0766 13.38 19.2313C13.38 18.3859 12.7695 17.7754 11.9241 17.7754C11.0788 17.7754 10.4682 18.3859 10.4682 19.2313Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
