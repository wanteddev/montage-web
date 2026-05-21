import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 수정할 때 사용합니다.
 * 키워드: Edit, 연필, 펜슬, 적다, 쓰다, Write
 * 속성: Solid
 */
const IconPencilFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M20.1782 3.82177C19.0213 2.66488 17.1456 2.66488 15.9887 3.82177L3.36376 16.4468C3.19498 16.6155 3.10016 16.8445 3.10016 17.0832V19.9998C3.10016 20.4969 3.5031 20.8998 4.00016 20.8998H6.91681C7.15551 20.8998 7.38442 20.805 7.55321 20.6362L20.1782 8.01122C21.335 6.85434 21.335 4.97866 20.1782 3.82177Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPencilFill;
