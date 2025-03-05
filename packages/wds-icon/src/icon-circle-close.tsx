import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.63631 8.36358C9.28484 8.01211 8.71499 8.01211 8.36352 8.36358C8.01205 8.71505 8.01205 9.2849 8.36352 9.63637L10.7271 12L8.36352 14.3636C8.01205 14.715 8.01205 15.2849 8.36352 15.6364C8.71499 15.9878 9.28484 15.9878 9.63631 15.6364L11.9999 13.2728L14.3635 15.6364C14.715 15.9878 15.2848 15.9878 15.6363 15.6364C15.9878 15.2849 15.9878 14.715 15.6363 14.3636L13.2727 12L15.6363 9.63637C15.9878 9.2849 15.9878 8.71505 15.6363 8.36358C15.2848 8.01211 14.715 8.01211 14.3635 8.36358L11.9999 10.7272L9.63631 8.36358Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.0996C6.53231 2.0996 2.09994 6.53197 2.09994 11.9996C2.09994 17.4672 6.53231 21.8996 11.9999 21.8996C17.4675 21.8996 21.8999 17.4672 21.8999 11.9996C21.8999 6.53197 17.4675 2.0996 11.9999 2.0996ZM3.89994 11.9996C3.89994 7.52608 7.52642 3.8996 11.9999 3.8996C16.4734 3.8996 20.0999 7.52608 20.0999 11.9996C20.0999 16.4731 16.4734 20.0996 11.9999 20.0996C7.52642 20.0996 3.89994 16.4731 3.89994 11.9996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
