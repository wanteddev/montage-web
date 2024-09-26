import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.6466 9.87586C16.9923 9.51871 16.983 8.94894 16.6258 8.60325C16.2687 8.25755 15.6989 8.26684 15.3532 8.62399L10.6773 13.4549L8.64747 11.3521C8.30226 10.9945 7.7325 10.9844 7.37488 11.3297C7.01726 11.6749 7.00719 12.2446 7.3524 12.6022L10.0289 15.375C10.1983 15.5505 10.4318 15.6497 10.6758 15.6499C10.9198 15.6501 11.1534 15.5512 11.3231 15.3758L16.6466 9.87586Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.09996C6.53232 2.09996 2.09996 6.53232 2.09996 11.9999C2.09996 17.4675 6.53232 21.8999 11.9999 21.8999C17.4675 21.8999 21.8999 17.4675 21.8999 11.9999C21.8999 6.53232 17.4675 2.09996 11.9999 2.09996ZM3.89996 11.9999C3.89996 7.52643 7.52643 3.89996 11.9999 3.89996C16.4734 3.89996 20.0999 7.52643 20.0999 11.9999C20.0999 16.4734 16.4734 20.0999 11.9999 20.0999C7.52643 20.0999 3.89996 16.4734 3.89996 11.9999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheck;
