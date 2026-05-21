import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 라디오 버튼을 표현합니다.
 * 키워드: 서클 닷
 * 속성: Outlined
 */
const IconCircleDot = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.1 12C8.1 9.84609 9.84609 8.1 12 8.1C14.1539 8.1 15.9 9.84609 15.9 12C15.9 14.1539 14.1539 15.9 12 15.9C9.84609 15.9 8.1 14.1539 8.1 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09998 12.0001C2.09998 6.53248 6.53236 2.1001 12 2.1001C17.4676 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4676 21.9001 12 21.9001C6.53236 21.9001 2.09998 17.4677 2.09998 12.0001ZM12 3.9001C7.52647 3.9001 3.89998 7.52659 3.89998 12.0001C3.89998 16.4736 7.52647 20.1001 12 20.1001C16.4735 20.1001 20.1 16.4736 20.1 12.0001C20.1 7.52659 16.4735 3.9001 12 3.9001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleDot;
