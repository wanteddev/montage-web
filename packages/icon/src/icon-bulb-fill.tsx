import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아이디어 등을 표현합니다.
 * 키워드: 전구, Bulb, 아이디어
 * 속성: Outlined
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
        d="M14.25 21.0996C14.7469 21.0996 15.1502 21.5031 15.1504 22C15.1504 22.4971 14.7471 22.9004 14.25 22.9004H9.75C9.25295 22.9004 8.84961 22.497 8.84961 22C8.84982 21.5031 9.25309 21.0996 9.75 21.0996H14.25Z"
        fill="currentColor"
      />
      <path
        d="M12 2.09961C16.0869 2.09961 19.4004 5.41309 19.4004 9.5C19.4004 12.2605 17.8878 14.665 15.6504 15.9365V16.0996C15.6504 16.5047 15.6511 16.863 15.627 17.1582C15.602 17.464 15.5458 17.7814 15.3887 18.0898C15.1586 18.5413 14.7913 18.9086 14.3398 19.1387C14.0314 19.2958 13.714 19.352 13.4082 19.377C13.113 19.4011 12.7547 19.4004 12.3496 19.4004H11.6504C11.2453 19.4004 10.887 19.4011 10.5918 19.377C10.286 19.352 9.96861 19.2958 9.66016 19.1387C9.20865 18.9086 8.84141 18.5413 8.61133 18.0898C8.45416 17.7814 8.39803 17.464 8.37305 17.1582C8.34895 16.863 8.34961 16.5047 8.34961 16.0996V15.9365C6.11224 14.665 4.59961 12.2605 4.59961 9.5C4.59961 5.41309 7.91309 2.09961 12 2.09961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBulbFill;
