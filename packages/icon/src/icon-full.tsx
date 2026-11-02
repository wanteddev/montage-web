import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 확장하거나 확대할 때 사용합니다.
 * 키워드: Expand, 확대, 확장, 전체
 * 속성: Outlined
 */
const IconFull = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.3387 9.88965C13.0016 10.2549 13.0244 10.8243 13.3896 11.1614C13.7548 11.4986 14.3242 11.4758 14.6614 11.1106L19.1 6.30198V10.0001C19.1 10.4972 19.503 10.9001 20 10.9001C20.4971 10.9001 20.9 10.4972 20.9 10.0001V4.0001C20.9 3.50304 20.4971 3.1001 20 3.1001H14.5001C14.003 3.1001 13.6001 3.50304 13.6001 4.0001C13.6001 4.49715 14.003 4.9001 14.5001 4.9001L17.9445 4.9001L13.3387 9.88965Z"
        fill="currentColor"
      />
      <path
        d="M4.90009 14.0001C4.90009 13.503 4.49715 13.1001 4.00009 13.1001C3.50304 13.1001 3.1001 13.503 3.1001 14.0001V20.0001C3.1001 20.4972 3.50304 20.9001 4.00009 20.9001H9.50007C9.99713 20.9001 10.4001 20.4972 10.4001 20.0001C10.4001 19.503 9.99713 19.1001 9.50007 19.1001H6.17288L10.6365 14.6365C10.9879 14.285 10.9879 13.7152 10.6365 13.3637C10.285 13.0122 9.71515 13.0122 9.36368 13.3637L4.90009 17.8273V14.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFull;
