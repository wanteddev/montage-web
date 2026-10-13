import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 원형을 표현합니다.
 * 키워드: Oval, 원형
 * 속성: Outlined
 */
const IconCircle = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0001 3.9001C7.52657 3.9001 3.90009 7.52659 3.90009 12.0001C3.90009 16.4736 7.52657 20.1001 12.0001 20.1001C16.4735 20.1001 20.1 16.4736 20.1 12.0001C20.1 7.52659 16.4735 3.9001 12.0001 3.9001ZM2.1001 12.0001C2.1001 6.53248 6.53246 2.1001 12.0001 2.1001C17.4677 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4677 21.9001 12.0001 21.9001C6.53246 21.9001 2.1001 17.4677 2.1001 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircle;
