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
        d="M12.9999 7.99984C12.9999 8.55212 12.5522 8.99983 11.9999 8.99983C11.4476 8.99983 10.9999 8.55212 10.9999 7.99984C10.9999 7.44756 11.4476 6.99984 11.9999 6.99984C12.5522 6.99984 12.9999 7.44756 12.9999 7.99984Z"
        fill="currentColor"
      />
      <path
        d="M12.9 11.4998C12.9 11.0028 12.4971 10.5998 12 10.5998C11.5029 10.5998 11.1 11.0028 11.1 11.4998V15.9998C11.1 16.4969 11.5029 16.8998 12 16.8998C12.4971 16.8998 12.9 16.4969 12.9 15.9998V11.4998Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09996 11.9999C2.09996 6.53232 6.53232 2.09996 11.9999 2.09996C17.4675 2.09996 21.8998 6.53232 21.8998 11.9999C21.8998 17.4675 17.4675 21.8999 11.9999 21.8999C6.53232 21.8999 2.09996 17.4675 2.09996 11.9999ZM11.9999 3.89996C7.52643 3.89996 3.89996 7.52643 3.89996 11.9999C3.89996 16.4734 7.52643 20.0999 11.9999 20.0999C16.4734 20.0999 20.0999 16.4734 20.0999 11.9999C20.0999 7.52643 16.4734 3.89996 11.9999 3.89996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
