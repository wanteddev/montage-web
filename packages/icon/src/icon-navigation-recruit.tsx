import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 모바일 환경 하단의 내비게이션 바에 들어가는 아이콘입니다.
 * 키워드: 리크루트, 채용, Recruit 내비게이션
 */
const IconNavigationRecruit = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.8552 2.55C8.92221 2.55 7.35521 4.117 7.35521 6.05V6.15471H6.14999C4.4103 6.15471 3 7.56461 3 9.3038V18.3012C3 20.0404 4.4103 21.4503 6.14999 21.4503H17.8499C19.5896 21.4503 20.9999 20.0404 20.9999 18.3012V9.3038C20.9999 7.56461 19.5896 6.15471 17.8499 6.15471H16.5552V6.05C16.5552 4.11701 14.9882 2.55 13.0552 2.55H10.8552ZM14.5552 6.15471V6.05C14.5552 5.22158 13.8836 4.55 13.0552 4.55H10.8552C10.0268 4.55 9.3552 5.22158 9.3552 6.05V6.15471H14.5552Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
