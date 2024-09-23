import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCoffeeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.8675 3.09473H16.1342C16.5256 3.09471 16.8722 3.0947 17.1593 3.11816C17.4651 3.14314 17.782 3.19915 18.0904 3.35631C18.542 3.58641 18.9092 3.95356 19.1392 4.40515C19.2563 4.63479 19.3172 4.86909 19.351 5.1H19.7499C22.0419 5.1 23.8999 6.95802 23.8999 9.25C23.8999 11.542 22.0419 13.4 19.7499 13.4H18.4399C17.0343 16.0728 14.2307 17.8957 11.0012 17.8957C6.36191 17.8957 2.60083 14.1338 2.60083 9.49473V6.3614C2.60081 5.9699 2.6008 5.6234 2.62426 5.33624C2.64924 5.03046 2.70525 4.71361 2.86242 4.40515C3.09251 3.95356 3.45967 3.58641 3.91126 3.35631C4.21971 3.19915 4.53656 3.14314 4.84235 3.11816C5.12949 3.0947 5.47602 3.09471 5.8675 3.09473ZM19.7499 6.9H19.4008V9.49473C19.4008 10.2217 19.3085 10.9272 19.1349 11.6H19.7499C21.0477 11.6 22.0999 10.5479 22.0999 9.25C22.0999 7.95213 21.0477 6.9 19.7499 6.9Z"
        fill="currentColor"
      />
      <path
        d="M4.75098 20.099C4.25392 20.099 3.85098 20.502 3.85098 20.999C3.85098 21.4961 4.25392 21.899 4.75098 21.899H17.751C18.248 21.899 18.651 21.4961 18.651 20.999C18.651 20.502 18.248 20.099 17.751 20.099H4.75098Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCoffeeFill;
