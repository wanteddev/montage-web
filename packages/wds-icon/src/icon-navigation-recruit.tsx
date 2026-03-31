import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M10.8552 2.54999C8.92221 2.54999 7.35521 4.11699 7.35521 6.04999V6.1547H6.14999C4.4103 6.1547 3 7.56459 3 9.30378V18.3012C3 20.0404 4.4103 21.4503 6.14999 21.4503H17.8499C19.5896 21.4503 20.9999 20.0404 20.9999 18.3012V9.30378C20.9999 7.56459 19.5896 6.1547 17.8499 6.1547H16.5552V6.04999C16.5552 4.11699 14.9882 2.54999 13.0552 2.54999H10.8552ZM14.5552 6.1547V6.04999C14.5552 5.22156 13.8836 4.54999 13.0552 4.54999H10.8552C10.0268 4.54999 9.3552 5.22156 9.3552 6.04999V6.1547H14.5552Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationRecruit;
