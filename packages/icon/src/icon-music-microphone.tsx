import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.1001 16.6728L8.63649 19.1364C7.81798 19.9549 6.59991 20.1303 5.6101 19.6627L4.13649 21.1363C3.78502 21.4878 3.21517 21.4878 2.8637 21.1363C2.51223 20.7849 2.51223 20.215 2.8637 19.8635L4.33733 18.3899C3.86975 17.4001 4.0452 16.1821 4.8637 15.3636L11.6078 8.6195C11.4293 7.34731 11.8035 6.0125 12.7302 5.0029L18.9972 11.2699C17.9876 12.1966 16.6528 12.5708 15.3806 12.3923L12.9001 14.8728V21C12.9001 21.497 12.4972 21.9 12.0001 21.9C11.503 21.9 11.1001 21.497 11.1001 21V16.6728ZM12.3865 10.3864L6.13649 16.6364C5.79761 16.9753 5.79761 17.5247 6.13649 17.8636C6.47538 18.2025 7.02482 18.2025 7.3637 17.8636L13.6137 11.6136L12.3865 10.3864Z"
        fill="currentColor"
      />
      <path
        d="M20.27 9.99708C21.8675 8.25676 21.823 5.55008 20.1365 3.86359C18.45 2.17711 15.7433 2.13261 14.003 3.73011L20.27 9.99708Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMusicMicrophone;
