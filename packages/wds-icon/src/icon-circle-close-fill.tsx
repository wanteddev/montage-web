import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleCloseFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09997 11.9996C2.09997 6.53197 6.53234 2.0996 11.9999 2.0996C17.4675 2.0996 21.8999 6.53197 21.8999 11.9996C21.8999 17.4672 17.4675 21.8996 11.9999 21.8996C6.53234 21.8996 2.09997 17.4672 2.09997 11.9996ZM9.13634 7.86322C8.78486 7.51175 8.21502 7.51175 7.86355 7.86322C7.51207 8.21469 7.51207 8.78454 7.86355 9.13601L10.7271 11.9996L7.86355 14.8632C7.51207 15.2147 7.51207 15.7845 7.86355 16.136C8.21502 16.4875 8.78486 16.4875 9.13634 16.136L11.9999 13.2724L14.8635 16.136C15.215 16.4875 15.7848 16.4875 16.1363 16.136C16.4878 15.7845 16.4878 15.2147 16.1363 14.8632L13.2727 11.9996L16.1363 9.13601C16.4878 8.78454 16.4878 8.21469 16.1363 7.86322C15.7848 7.51175 15.215 7.51175 14.8635 7.86322L11.9999 10.7268L9.13634 7.86322Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCloseFill;
