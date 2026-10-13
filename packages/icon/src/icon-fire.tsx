import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 불꽃을 표현합니다.
 * 키워드: Featured, Hot, 인기
 * 속성: Outlined
 */
const IconFire = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.49962 15.1002C8.49962 17.0002 10.0496 18.5002 11.9996 18.5002C13.9496 18.5002 15.4996 17.0002 15.4996 15.1002C15.4996 13.2002 13.9496 11.7002 11.9996 10.0002C10.0496 11.7002 8.49962 13.2002 8.49962 15.1002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2644 1.83176C13.5053 1.13309 12.3108 1.30634 11.7666 2.16348L8.8104 6.81953L8.11081 6.1899C7.48794 5.62932 6.48774 5.60057 5.85953 6.26259C3.96102 8.26325 2.84961 10.8751 2.84961 13.6006C2.84961 16.1306 3.78893 18.3447 5.43211 19.9244C7.07319 21.5021 9.36702 22.4006 11.9996 22.4006C17.3281 22.4006 21.1496 18.516 21.1496 13.6006C21.1496 9.43786 18.4903 5.72118 14.2644 1.83176ZM9.75938 8.68304L13.186 3.28607C17.2585 7.06316 19.3496 10.2844 19.3496 13.6006C19.3496 17.4853 16.371 20.6006 11.9996 20.6006C9.78216 20.6006 7.951 19.8491 6.67959 18.6268C5.41028 17.4065 4.6496 15.6706 4.6496 13.6006C4.6496 11.4307 5.511 9.31266 7.03412 7.64253L8.39752 8.86959C8.5944 9.04678 8.85932 9.12825 9.12174 9.0923C9.38415 9.05635 9.61741 8.90664 9.75938 8.68304Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFire;
