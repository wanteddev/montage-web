import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M20.3175 4.99222C21.2334 5.23717 21.9576 5.96137 22.2026 6.87727C22.6499 8.53867 22.6499 11.9999 22.6499 11.9999C22.6499 11.9999 22.6499 15.4612 22.2026 17.1226C21.9576 18.0385 21.2334 18.7627 20.3175 19.0076C18.6562 19.4549 11.9999 19.4549 11.9999 19.4549C11.9999 19.4549 5.34371 19.4549 3.68232 19.0076C2.76642 18.7627 2.04222 18.0385 1.79727 17.1226C1.34998 15.4612 1.34998 11.9999 1.34998 11.9999C1.34998 11.9999 1.34998 8.53867 1.79727 6.87727C2.04222 5.96137 2.76642 5.23717 3.68232 4.99222C5.34371 4.54492 11.9999 4.54492 11.9999 4.54492C11.9999 4.54492 18.6562 4.54492 20.3175 4.99222ZM9.86996 8.80518V15.1952L15.4079 12.0002L9.86996 8.80518Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoYoutube;
