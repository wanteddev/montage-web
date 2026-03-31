import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 모바일 환경 하단의 내비게이션 바에 들어가는 아이콘입니다.
 * 키워드: 메뉴 내비게이션, Menu, Hamburger, Three lines
 */
const IconNavigationMenu = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.3333 5H4.66666C4.29848 5 4 5.36563 4 5.81667V6.63333C4 7.08437 4.29848 7.45 4.66666 7.45H19.3333C19.7015 7.45 19.9999 7.08437 19.9999 6.63333V5.81667C19.9999 5.36563 19.7015 5 19.3333 5Z"
        fill="currentColor"
      />
      <path
        d="M19.3333 10.775H4.66666C4.29848 10.775 4 11.1406 4 11.5917V12.4083C4 12.8594 4.29848 13.225 4.66666 13.225H19.3333C19.7015 13.225 19.9999 12.8594 19.9999 12.4083V11.5917C19.9999 11.1406 19.7015 10.775 19.3333 10.775Z"
        fill="currentColor"
      />
      <path
        d="M4.66666 16.55H19.3333C19.7015 16.55 19.9999 16.9156 19.9999 17.3667V18.1833C19.9999 18.6344 19.7015 19 19.3333 19H4.66666C4.29848 19 4 18.6344 4 18.1833V17.3667C4 16.9156 4.29848 16.55 4.66666 16.55Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationMenu;
