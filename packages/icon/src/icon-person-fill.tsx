import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M7.60017 7.25254C7.60017 4.82249 9.57011 2.85254 12.0001 2.85254C14.4302 2.85254 16.4001 4.82249 16.4001 7.25254C16.4001 9.68259 14.4302 11.6525 12.0001 11.6525C9.57011 11.6525 7.60017 9.68259 7.60017 7.25254Z"
        fill="currentColor"
      />
      <path
        d="M12.0001 13.5986C9.68814 13.5986 7.5307 14.0512 5.91643 14.9207C4.3033 15.7897 3.1001 17.1648 3.1001 18.9986L3.1001 19.3263C3.10007 19.513 3.10004 19.703 3.11331 19.8655C3.12808 20.0462 3.16365 20.2704 3.27996 20.4987C3.43816 20.8092 3.69059 21.0616 4.00108 21.2198C4.22933 21.336 4.45358 21.3716 4.63431 21.3864C4.79675 21.3996 4.98678 21.3996 5.17343 21.3995L18.8269 21.3987C19.0136 21.3988 19.2036 21.3988 19.366 21.3855C19.5467 21.3707 19.771 21.3351 19.9992 21.2188C20.3096 21.0606 20.562 20.8082 20.7202 20.4978C20.8365 20.2695 20.8721 20.0453 20.8868 19.8646C20.9001 19.7022 20.9001 19.5121 20.9 19.3255L20.9 18.9986C20.9 17.1648 19.6968 15.7897 18.0837 14.9207C16.4694 14.0512 14.312 13.5986 12.0001 13.5986Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
