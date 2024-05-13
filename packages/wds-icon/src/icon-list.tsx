import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconList = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.74969 7C4.44005 7 4.99969 6.44036 4.99969 5.75C4.99969 5.05964 4.44005 4.5 3.74969 4.5C3.05934 4.5 2.49969 5.05964 2.49969 5.75C2.49969 6.44036 3.05934 7 3.74969 7Z"
        fill="currentColor"
      />
      <path
        d="M7.34982 5.75C7.34982 5.25294 7.75276 4.85 8.24982 4.85H20.2498C20.7469 4.85 21.1498 5.25294 21.1498 5.75C21.1498 6.24706 20.7469 6.65 20.2498 6.65H8.24982C7.75276 6.65 7.34982 6.24706 7.34982 5.75Z"
        fill="currentColor"
      />
      <path
        d="M3.74969 13.25C4.44005 13.25 4.99969 12.6904 4.99969 12C4.99969 11.3096 4.44005 10.75 3.74969 10.75C3.05934 10.75 2.49969 11.3096 2.49969 12C2.49969 12.6904 3.05934 13.25 3.74969 13.25Z"
        fill="currentColor"
      />
      <path
        d="M7.34982 12C7.34982 11.5029 7.75276 11.1 8.24982 11.1H20.2498C20.7469 11.1 21.1498 11.5029 21.1498 12C21.1498 12.4971 20.7469 12.9 20.2498 12.9H8.24982C7.75276 12.9 7.34982 12.4971 7.34982 12Z"
        fill="currentColor"
      />
      <path
        d="M3.74969 19.5C4.44005 19.5 4.99969 18.9404 4.99969 18.25C4.99969 17.5596 4.44005 17 3.74969 17C3.05934 17 2.49969 17.5596 2.49969 18.25C2.49969 18.9404 3.05934 19.5 3.74969 19.5Z"
        fill="currentColor"
      />
      <path
        d="M8.24982 17.35C7.75276 17.35 7.34982 17.7529 7.34982 18.25C7.34982 18.7471 7.75276 19.15 8.24982 19.15H20.2498C20.7469 19.15 21.1498 18.7471 21.1498 18.25C21.1498 17.7529 20.7469 17.35 20.2498 17.35H8.24982Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconList;
