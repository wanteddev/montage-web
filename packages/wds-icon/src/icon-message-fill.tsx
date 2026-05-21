import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 메시지를 표현합니다.
 * 키워드: 메시지
 * 속성: Solid
 */
const IconMessageFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.35016 11.9996C2.35016 6.67006 6.67059 2.34961 12.0001 2.34961C17.3296 2.34961 21.6501 6.67006 21.6501 11.9996C21.6501 13.538 21.2895 14.9944 20.6476 16.2868L21.1419 18.0992C21.2538 18.5093 21.3536 18.8753 21.4067 19.1758C21.4605 19.4804 21.4971 19.8665 21.3499 20.2521C21.1569 20.7574 20.7578 21.1565 20.2526 21.3494C19.8669 21.4967 19.4809 21.46 19.1763 21.4062C18.8757 21.3532 18.5098 21.2534 18.0997 21.1415L16.2873 20.6472C14.9948 21.289 13.5384 21.6496 12.0001 21.6496C6.67059 21.6496 2.35016 17.3292 2.35016 11.9996ZM7.0998 9.99951C7.0998 9.50246 7.50274 9.09951 7.99979 9.09951H15.9998C16.4968 9.09951 16.8998 9.50246 16.8998 9.99951C16.8998 10.4966 16.4968 10.8995 15.9998 10.8995H7.99979C7.50274 10.8995 7.0998 10.4966 7.0998 9.99951ZM7.0998 13.9995C7.0998 13.5025 7.50274 13.0995 7.99979 13.0995H12.7498C13.2468 13.0995 13.6498 13.5025 13.6498 13.9995C13.6498 14.4966 13.2468 14.8995 12.7498 14.8995H7.99979C7.50274 14.8995 7.0998 14.4966 7.0998 13.9995Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
