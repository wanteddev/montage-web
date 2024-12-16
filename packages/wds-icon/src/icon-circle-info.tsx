import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleInfo = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 7.99997C12.9999 8.55225 12.5521 8.99997 11.9999 8.99997C11.4476 8.99997 10.9999 8.55225 10.9999 7.99997C10.9999 7.44769 11.4476 6.99997 11.9999 6.99997C12.5521 6.99997 12.9999 7.44769 12.9999 7.99997Z"
        fill="currentColor"
      />
      <path
        d="M12.9 11.5C12.9 11.0029 12.497 10.6 12 10.6C11.5029 10.6 11.1 11.0029 11.1 11.5V15.9999C11.1 16.497 11.5029 16.8999 12 16.8999C12.497 16.8999 12.9 16.497 12.9 15.9999V11.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09994 12.0001C2.09994 6.53245 6.5323 2.10009 11.9999 2.10009C17.4675 2.10009 21.8998 6.53245 21.8998 12.0001C21.8998 17.4676 17.4675 21.9 11.9999 21.9C6.5323 21.9 2.09994 17.4676 2.09994 12.0001ZM11.9999 3.90008C7.52641 3.90008 3.89993 7.52656 3.89993 12.0001C3.89993 16.4735 7.52641 20.1 11.9999 20.1C16.4734 20.1 20.0999 16.4735 20.0999 12.0001C20.0999 7.52656 16.4734 3.90008 11.9999 3.90008Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
