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
        d="M12.0003 3.1543C6.79578 3.1543 2.57178 6.43544 2.57178 10.4709C2.57178 12.9883 4.20292 15.1852 6.69206 16.524L5.64549 20.3614C5.62575 20.4378 5.62981 20.5183 5.65714 20.5923C5.68447 20.6662 5.73376 20.73 5.7984 20.7752C5.86303 20.8203 5.93993 20.8446 6.01877 20.8448C6.09761 20.845 6.17463 20.8211 6.23949 20.7763L10.8218 17.7309C11.2084 17.7309 11.6044 17.7969 12.0003 17.7969C17.2049 17.7969 21.4289 14.5157 21.4289 10.4709C21.4289 6.42601 17.2049 3.1543 12.0003 3.1543Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoKakao;
