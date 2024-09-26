import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCode = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.2182 3.12656C14.7004 3.24711 14.9936 3.73575 14.8731 4.21796L10.8731 20.2179C10.7525 20.7001 10.2639 20.9933 9.78167 20.8727C9.29946 20.7522 9.00627 20.2635 9.12683 19.7813L13.1268 3.7814C13.2474 3.29919 13.736 3.006 14.2182 3.12656Z"
        fill="currentColor"
      />
      <path
        d="M16.3635 6.36327C16.0121 6.71474 16.0121 7.28459 16.3635 7.63606L20.7271 11.9996L16.3635 16.3632C16.0121 16.7147 16.0121 17.2845 16.3635 17.636C16.715 17.9875 17.2848 17.9875 17.6363 17.636L22.6363 12.636C22.9878 12.2846 22.9878 11.7147 22.6363 11.3632L17.6363 6.36327C17.2848 6.0118 16.715 6.0118 16.3635 6.36327Z"
        fill="currentColor"
      />
      <path
        d="M7.63646 7.63606C7.98793 7.28459 7.98793 6.71474 7.63646 6.36327C7.28499 6.0118 6.71514 6.0118 6.36367 6.36327L1.36369 11.3632C1.01222 11.7147 1.01222 12.2846 1.36369 12.636L6.36367 17.636C6.71514 17.9875 7.28499 17.9875 7.63646 17.636C7.98793 17.2845 7.98793 16.7147 7.63646 16.3632L3.27287 11.9996L7.63646 7.63606Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCode;
