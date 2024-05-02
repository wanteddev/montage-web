import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFull = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        d="M13.3388 9.88965C13.0016 10.2549 13.0244 10.8243 13.3896 11.1614C13.7549 11.4986 14.3243 11.4758 14.6614 11.1106L19.1001 6.30198V10.0001C19.1001 10.4972 19.503 10.9001 20.0001 10.9001C20.4972 10.9001 20.9001 10.4972 20.9001 10.0001V4.0001C20.9001 3.50304 20.4972 3.1001 20.0001 3.1001H14.5001C14.003 3.1001 13.6001 3.50304 13.6001 4.0001C13.6001 4.49715 14.003 4.9001 14.5001 4.9001L17.9445 4.9001L13.3388 9.88965Z"
      />
      <path
        fill="currentColor"
        d="M4.9001 14.0001C4.9001 13.503 4.49715 13.1001 4.0001 13.1001C3.50304 13.1001 3.1001 13.503 3.1001 14.0001V20.0001C3.1001 20.4972 3.50304 20.9001 4.0001 20.9001H9.5001C9.99715 20.9001 10.4001 20.4972 10.4001 20.0001C10.4001 19.503 9.99715 19.1001 9.5001 19.1001H6.17289L10.6365 14.6365C10.988 14.285 10.988 13.7152 10.6365 13.3637C10.285 13.0122 9.71517 13.0122 9.3637 13.3637L4.9001 17.8273V14.0001Z"
      />
    </Box>
  );
});

export default IconFull;
