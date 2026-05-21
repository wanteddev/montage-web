import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아이디어 등을 표현합니다.
 * 키워드: 전구, Bulb, 아이디어
 * 속성: Solid
 */
const IconBulbFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2501 21.0996C14.747 21.0996 15.1503 21.5031 15.1505 22C15.1505 22.4971 14.7471 22.9004 14.2501 22.9004H9.75009C9.25305 22.9004 8.8497 22.497 8.8497 22C8.84991 21.5031 9.25318 21.0996 9.75009 21.0996H14.2501Z"
        fill="currentColor"
      />
      <path
        d="M12.0001 2.09961C16.087 2.09961 19.4005 5.41309 19.4005 9.5C19.4005 12.2605 17.8878 14.665 15.6505 15.9365V16.0996C15.6505 16.5047 15.6511 16.863 15.627 17.1582C15.6021 17.464 15.5459 17.7814 15.3888 18.0898C15.1587 18.5413 14.7914 18.9086 14.3399 19.1387C14.0315 19.2958 13.7141 19.352 13.4083 19.377C13.1131 19.4011 12.7547 19.4004 12.3497 19.4004H11.6505C11.2454 19.4004 10.8871 19.4011 10.5919 19.377C10.2861 19.352 9.9687 19.2958 9.66025 19.1387C9.20874 18.9086 8.8415 18.5413 8.61142 18.0898C8.45425 17.7814 8.39812 17.464 8.37314 17.1582C8.34904 16.863 8.3497 16.5047 8.3497 16.0996V15.9365C6.11233 14.665 4.5997 12.2605 4.5997 9.5C4.5997 5.41309 7.91318 2.09961 12.0001 2.09961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBulbFill;
