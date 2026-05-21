import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 닫을 때 사용합니다.
 * 키워드: 닫기, Close
 * 속성: Outlined
 */
const IconClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.86349 4.86321C5.21496 4.51174 5.78481 4.51174 6.13628 4.86321L11.9999 10.7268L17.8634 4.86321C18.2149 4.51174 18.7848 4.51174 19.1362 4.86321C19.4877 5.21468 19.4877 5.78453 19.1362 6.13601L13.2726 11.9996L19.1362 17.8632C19.4877 18.2147 19.4877 18.7845 19.1362 19.136C18.7848 19.4875 18.2149 19.4875 17.8634 19.136L11.9999 13.2724L6.13628 19.136C5.78481 19.4875 5.21496 19.4875 4.86349 19.136C4.51202 18.7845 4.51202 18.2147 4.86349 17.8632L10.7271 11.9996L4.86349 6.13601C4.51202 5.78453 4.51202 5.21468 4.86349 4.86321Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
