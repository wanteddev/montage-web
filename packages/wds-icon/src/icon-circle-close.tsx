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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09997 12.0001C2.09997 6.53246 6.53234 2.10009 11.9999 2.10009C17.4675 2.10009 21.8999 6.53246 21.8999 12.0001C21.8999 17.4677 17.4675 21.9 11.9999 21.9C6.53234 21.9 2.09997 17.4677 2.09997 12.0001ZM9.13634 7.86371C8.78486 7.51224 8.21502 7.51223 7.86355 7.86371C7.51207 8.21518 7.51207 8.78502 7.86355 9.13649L10.7271 12.0001L7.86355 14.8637C7.51207 15.2152 7.51207 15.785 7.86355 16.1365C8.21502 16.4879 8.78486 16.4879 9.13634 16.1365L11.9999 13.2729L14.8635 16.1365C15.215 16.4879 15.7848 16.4879 16.1363 16.1365C16.4878 15.785 16.4878 15.2152 16.1363 14.8637L13.2727 12.0001L16.1363 9.13649C16.4878 8.78502 16.4878 8.21518 16.1363 7.86371C15.7848 7.51223 15.215 7.51224 14.8635 7.86371L11.9999 10.7273L9.13634 7.86371Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleClose;
