import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M8.10012 12C8.10012 9.84609 9.84621 8.1 12.0001 8.1C14.154 8.1 15.9001 9.84609 15.9001 12C15.9001 14.1539 14.154 15.9 12.0001 15.9C9.84621 15.9 8.10012 14.1539 8.10012 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.1001 12.0001C2.1001 6.53248 6.53248 2.1001 12.0001 2.1001C17.4677 2.1001 21.9001 6.53248 21.9001 12.0001C21.9001 17.4677 17.4677 21.9001 12.0001 21.9001C6.53248 21.9001 2.1001 17.4677 2.1001 12.0001ZM12.0001 3.9001C7.52659 3.9001 3.9001 7.52659 3.9001 12.0001C3.9001 16.4736 7.52659 20.1001 12.0001 20.1001C16.4736 20.1001 20.1001 16.4736 20.1001 12.0001C20.1001 7.52659 16.4736 3.9001 12.0001 3.9001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleDot;
