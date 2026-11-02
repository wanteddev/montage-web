import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 선택 여부를 표시할 때 사용합니다.
 * 키워드: 확인, 체크, 첵, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.3864 6.86346C19.7379 7.21493 19.7379 7.78478 19.3864 8.13625L10.3865 17.1362C10.035 17.4877 9.46515 17.4877 9.11368 17.1362L4.6137 12.6362C4.26223 12.2848 4.26223 11.7149 4.6137 11.3635C4.96517 11.012 5.53502 11.012 5.88649 11.3635L9.75008 15.2271L18.1136 6.86346C18.4651 6.51199 19.035 6.51199 19.3864 6.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheck;
