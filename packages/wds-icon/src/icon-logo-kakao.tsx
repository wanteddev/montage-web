import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoKakao = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0003 3.15428C6.79575 3.15428 2.57177 6.43542 2.57177 10.4708C2.57177 12.9882 4.2029 15.1851 6.69204 16.524L5.64547 20.3614C5.62572 20.4377 5.62979 20.5182 5.65712 20.5922C5.68445 20.6661 5.73374 20.73 5.79837 20.7751C5.86301 20.8203 5.93991 20.8446 6.01875 20.8448C6.09759 20.845 6.1746 20.821 6.23947 20.7762L10.8217 17.7308C11.2083 17.7308 11.6043 17.7968 12.0003 17.7968C17.2049 17.7968 21.4288 14.5157 21.4288 10.4708C21.4288 6.42599 17.2049 3.15428 12.0003 3.15428Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoKakao;
