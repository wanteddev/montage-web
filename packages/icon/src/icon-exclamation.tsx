import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 경고하는 상황을 표현합니다.
 * 키워드: 느낌표, 경고, 주의, 부적합, Warning
 * 속성: Outlined
 */
const IconExclamation = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9001 5.0001C12.9001 4.50304 12.4972 4.1001 12.0001 4.1001C11.5031 4.1001 11.1001 4.50304 11.1001 5.0001V14.5001C11.1001 14.9972 11.5031 15.4001 12.0001 15.4001C12.4972 15.4001 12.9001 14.9972 12.9001 14.5001V5.0001Z"
        fill="currentColor"
      />
      <path
        d="M12 20.2501C12.6903 20.2501 13.25 19.6905 13.25 19.0001C13.25 18.3097 12.6903 17.7501 12 17.7501C11.3096 17.7501 10.75 18.3097 10.75 19.0001C10.75 19.6905 11.3096 20.2501 12 20.2501Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconExclamation;
