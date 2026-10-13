import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 유튜브 로고를 표현합니다.
 * 키워드: 유튜브, YouTube Logo
 * 속성: Outlined
 */
const IconLogoYoutube = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M20.3177 4.99222C21.2336 5.23717 21.9578 5.96137 22.2027 6.87727C22.65 8.53867 22.65 11.9999 22.65 11.9999C22.65 11.9999 22.65 15.4612 22.2027 17.1226C21.9578 18.0385 21.2336 18.7627 20.3177 19.0076C18.6563 19.4549 12.0001 19.4549 12.0001 19.4549C12.0001 19.4549 5.34383 19.4549 3.68244 19.0076C2.76654 18.7627 2.04234 18.0385 1.7974 17.1226C1.3501 15.4612 1.3501 11.9999 1.3501 11.9999C1.3501 11.9999 1.3501 8.53867 1.7974 6.87727C2.04234 5.96137 2.76654 5.23717 3.68244 4.99222C5.34383 4.54492 12.0001 4.54492 12.0001 4.54492C12.0001 4.54492 18.6563 4.54492 20.3177 4.99222ZM9.87008 8.80518V15.1952L15.4081 12.0002L9.87008 8.80518Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoYoutube;
