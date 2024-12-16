import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationMypage = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.9999 11.9999C21.9999 17.5228 17.5228 21.9999 11.9999 21.9999C6.47712 21.9999 1.99999 17.5228 1.99999 11.9999C1.99999 6.47712 6.47712 1.99999 11.9999 1.99999C17.5228 1.99999 21.9999 6.47712 21.9999 11.9999ZM11.9998 12.0001C13.8408 12.0001 15.3331 10.5077 15.3331 8.66674C15.3331 6.8258 13.8408 5.33342 11.9998 5.33342C10.1589 5.33342 8.66651 6.8258 8.66651 8.66674C8.66651 10.5077 10.1589 12.0001 11.9998 12.0001ZM12 13.6665C9.27501 13.6665 6.86669 14.979 5.34586 16.9998C6.86669 19.0206 9.27918 20.3331 12 20.3331C14.7208 20.3331 17.1333 19.0206 18.6541 16.9998C17.1333 14.979 14.7208 13.6665 12 13.6665Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationMypage;
