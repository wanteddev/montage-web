import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPhoneFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.18172 15.8215C11.4906 19.1304 14.8243 20.3532 17.0083 20.7956C18.8212 21.1628 20.4911 20.3411 21.6551 19.1771L21.9272 18.9051C23.1943 17.6379 23.0204 15.5363 21.5621 14.4947L19.5676 13.07C18.6129 12.3881 17.3051 12.4963 16.4755 13.3259L15.6464 14.155C15.0405 13.9031 13.8215 13.2589 12.2829 11.7203C10.7443 10.1817 10.1 8.96273 9.8482 8.35674L10.6773 7.52764C11.5069 6.69805 11.6151 5.3903 10.9332 4.43563L9.50851 2.44105C8.46692 0.982828 6.36524 0.808888 5.0981 2.07603L4.8261 2.34803C3.66204 3.5121 2.84037 5.18203 3.20761 6.99488C3.65003 9.17887 4.8728 12.5126 8.18172 15.8215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
