import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 프로필을 표현합니다.
 * 키워드: Profile, 사람, Human, Person, 인간, 유저, User, 프로필
 * 속성: Solid
 */
const IconPersonFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.60004 7.25254C7.60004 4.82249 9.56998 2.85254 12 2.85254C14.4301 2.85254 16.4 4.82249 16.4 7.25254C16.4 9.68259 14.4301 11.6525 12 11.6525C9.56998 11.6525 7.60004 9.68259 7.60004 7.25254Z"
        fill="currentColor"
      />
      <path
        d="M11.9999 13.5986C9.68801 13.5986 7.53058 14.0512 5.91631 14.9207C4.30318 15.7897 3.09998 17.1648 3.09998 18.9986L3.09998 19.3263C3.09995 19.513 3.09992 19.703 3.11319 19.8655C3.12796 20.0462 3.16353 20.2704 3.27983 20.4987C3.43804 20.8092 3.69047 21.0616 4.00095 21.2198C4.22921 21.336 4.45346 21.3716 4.63418 21.3864C4.79663 21.3996 4.98666 21.3996 5.17331 21.3995L18.8268 21.3987C19.0135 21.3988 19.2035 21.3988 19.3659 21.3855C19.5466 21.3707 19.7708 21.3351 19.9991 21.2188C20.3095 21.0606 20.5619 20.8082 20.7201 20.4978C20.8364 20.2695 20.8719 20.0453 20.8867 19.8646C20.9 19.7022 20.8999 19.5121 20.8999 19.3255L20.8999 18.9986C20.8999 17.1648 19.6967 15.7897 18.0836 14.9207C16.4693 14.0512 14.3119 13.5986 11.9999 13.5986Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
