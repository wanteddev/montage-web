import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 무대용 마이크를 표현합니다.
 * 키워드: 세미나, Seminar
 * 속성: Outlined
 */
const IconMusicMicrophone = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.1 16.6728L8.63637 19.1364C7.81785 19.9549 6.59978 20.1303 5.60998 19.6627L4.13637 21.1363C3.7849 21.4878 3.21505 21.4878 2.86358 21.1363C2.51211 20.7849 2.51211 20.215 2.86358 19.8635L4.33721 18.3899C3.86962 17.4001 4.04508 16.1821 4.86358 15.3636L11.6077 8.6195C11.4292 7.34731 11.8034 6.0125 12.7301 5.0029L18.9971 11.2699C17.9875 12.1966 16.6526 12.5708 15.3805 12.3923L12.9 14.8728V21C12.9 21.497 12.497 21.9 12 21.9C11.5029 21.9 11.1 21.497 11.1 21V16.6728ZM12.3864 10.3864L6.13637 16.6364C5.79749 16.9753 5.79749 17.5247 6.13637 17.8636C6.47525 18.2025 7.02469 18.2025 7.36358 17.8636L13.6136 11.6136L12.3864 10.3864Z"
        fill="currentColor"
      />
      <path
        d="M20.2699 9.99708C21.8673 8.25676 21.8229 5.55008 20.1364 3.86359C18.4499 2.17711 15.7432 2.13261 14.0029 3.73011L20.2699 9.99708Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMusicMicrophone;
