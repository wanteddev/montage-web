import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 수정할 때 사용합니다.
 * 키워드: Edit, 연필, 펜슬, 적다, 쓰다, Write
 * 속성: Outlined
 */
const IconPencil = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M15.9887 3.82177C17.1455 2.66488 19.0212 2.66488 20.1781 3.82177C21.335 4.97866 21.335 6.85434 20.1781 8.01122L7.55314 20.6362C7.38436 20.805 7.15544 20.8998 6.91675 20.8998H4.00009C3.50304 20.8998 3.1001 20.4969 3.1001 19.9998V17.0832C3.1001 16.8445 3.19492 16.6155 3.3637 16.4468L15.9887 3.82177ZM18.9053 5.09456C18.4514 4.64062 17.7154 4.64062 17.2614 5.09456L4.90009 17.456V19.0998H6.54396L18.9053 6.73843C19.3592 6.28449 19.3592 5.5485 18.9053 5.09456Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencil;
