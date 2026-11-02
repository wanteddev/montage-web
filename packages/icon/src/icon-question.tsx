import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.9242 15.5214C11.3406 15.5214 10.8587 15.0444 10.9227 14.4643C11.4077 10.0619 14.9299 10.3711 14.9299 7.72543C14.9299 6.15213 13.6853 5.14241 11.9242 5.14241C10.4171 5.14241 9.39368 5.86784 9.04784 7.14896C8.89574 7.71238 8.44542 8.19507 7.86183 8.19507C7.27824 8.19507 6.7935 7.71825 6.88839 7.14242C7.29144 4.69663 9.13527 3.16992 11.9242 3.16992C14.8594 3.16992 17.0433 4.86063 17.0433 7.72543C17.0433 11.2897 13.6468 11.0736 13.0651 14.4671C12.9665 15.0423 12.5078 15.5214 11.9242 15.5214Z"
        fill="currentColor"
      />
      <path
        d="M10.4683 19.2313C10.4683 20.0766 11.0789 20.6872 11.9242 20.6872C12.7695 20.6872 13.3801 20.0766 13.3801 19.2313C13.3801 18.3859 12.7695 17.7754 11.9242 17.7754C11.0789 17.7754 10.4683 18.3859 10.4683 19.2313Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconQuestion;
