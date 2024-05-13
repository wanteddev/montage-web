import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconChevronDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.36376 7.36346C3.71523 7.01199 4.28508 7.01199 4.63655 7.36346L12.0002 14.7271L19.3637 7.36346C19.7152 7.01199 20.2851 7.01199 20.6365 7.36346C20.988 7.71493 20.988 8.28478 20.6365 8.63625L12.6365 16.6362C12.2851 16.9877 11.7152 16.9877 11.3638 16.6362L3.36376 8.63625C3.01229 8.28478 3.01229 7.71493 3.36376 7.36346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
