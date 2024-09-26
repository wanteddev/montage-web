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
        d="M8.18172 15.822C11.4906 19.1309 14.8243 20.3536 17.0083 20.7961C18.8212 21.1633 20.4911 20.3416 21.6551 19.1776L21.9272 18.9056C23.1943 17.6384 23.0204 15.5368 21.5621 14.4952L19.5676 13.0705C18.6129 12.3886 17.3051 12.4968 16.4755 13.3264L15.6464 14.1555C15.0405 13.9036 13.8215 13.2593 12.2829 11.7208C10.7443 10.1822 10.1 8.96322 9.8482 8.35723L10.6773 7.52813C11.5069 6.69854 11.6151 5.39079 10.9332 4.43611L9.50851 2.44154C8.46692 0.983316 6.36524 0.809377 5.0981 2.07652L4.8261 2.34852C3.66204 3.51258 2.84037 5.18252 3.20761 6.99537C3.65003 9.17935 4.8728 12.513 8.18172 15.822Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPhoneFill;
