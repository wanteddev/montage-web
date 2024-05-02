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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        d="M3.36376 7.36321C3.71523 7.01174 4.28508 7.01174 4.63655 7.36321L12.0002 14.7268L19.3637 7.36321C19.7152 7.01174 20.2851 7.01174 20.6365 7.36321C20.988 7.71469 20.988 8.28453 20.6365 8.63601L12.6365 16.636C12.2851 16.9875 11.7152 16.9875 11.3638 16.636L3.36376 8.63601C3.01229 8.28453 3.01229 7.71469 3.36376 7.36321Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDown;
