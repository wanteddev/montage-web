import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconHandleDesktop = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.3755 5.25C10.3755 4.2835 9.59199 3.5 8.62549 3.5C7.65899 3.5 6.87549 4.2835 6.87549 5.25C6.87549 6.2165 7.65899 7 8.62549 7C9.59199 7 10.3755 6.2165 10.3755 5.25Z"
        fill="currentColor"
      />
      <path
        d="M15.3755 17C16.342 17 17.1255 17.7835 17.1255 18.75C17.1255 19.7165 16.342 20.5 15.3755 20.5C14.409 20.5 13.6255 19.7165 13.6255 18.75C13.6255 17.7835 14.409 17 15.3755 17Z"
        fill="currentColor"
      />
      <path
        d="M17.1255 12C17.1255 11.0335 16.342 10.25 15.3755 10.25C14.409 10.25 13.6255 11.0335 13.6255 12C13.6255 12.9665 14.409 13.75 15.3755 13.75C16.342 13.75 17.1255 12.9665 17.1255 12Z"
        fill="currentColor"
      />
      <path
        d="M17.1255 5.25C17.1255 4.2835 16.342 3.5 15.3755 3.5C14.409 3.5 13.6255 4.2835 13.6255 5.25C13.6255 6.2165 14.409 7 15.3755 7C16.342 7 17.1255 6.2165 17.1255 5.25Z"
        fill="currentColor"
      />
      <path
        d="M8.62549 10.25C9.59199 10.25 10.3755 11.0335 10.3755 12C10.3755 12.9665 9.59199 13.75 8.62549 13.75C7.65899 13.75 6.87549 12.9665 6.87549 12C6.87549 11.0335 7.65899 10.25 8.62549 10.25Z"
        fill="currentColor"
      />
      <path
        d="M10.3755 18.75C10.3755 17.7835 9.59199 17 8.62549 17C7.65899 17 6.87549 17.7835 6.87549 18.75C6.87549 19.7165 7.65899 20.5 8.62549 20.5C9.59199 20.5 10.3755 19.7165 10.3755 18.75Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHandleDesktop;
