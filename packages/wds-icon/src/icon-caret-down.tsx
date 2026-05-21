import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 작은 아래쪽 화살표를 표현합니다.
 * 키워드: Bottom, Down, Caret, 캐릿
 * 속성: Outlined
 */
const IconCaretDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8627 14.7075C13.2249 15.4925 12.906 15.885 12.522 16.0276C12.1853 16.1525 11.8148 16.1525 11.4781 16.0276C11.0941 15.885 10.7752 15.4925 10.1374 14.7075L8.67971 12.9134C7.66318 11.6623 7.15492 11.0367 7.15155 10.5096C7.14862 10.0512 7.35547 9.61661 7.71308 9.32982C8.12434 9 8.93035 9 10.5424 9H13.4577C15.0697 9 15.8758 9 16.287 9.32982C16.6446 9.61661 16.8515 10.0512 16.8485 10.5096C16.8452 11.0367 16.3369 11.6623 15.3204 12.9134L13.8627 14.7075Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretDown;
