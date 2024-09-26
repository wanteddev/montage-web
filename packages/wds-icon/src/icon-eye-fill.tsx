import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconEyeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.8999 12C9.8999 10.8402 10.8401 9.89997 11.9999 9.89997C13.1597 9.89997 14.0999 10.8402 14.0999 12C14.0999 13.1597 13.1597 14.0999 11.9999 14.0999C10.8401 14.0999 9.8999 13.1597 9.8999 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0938 12.6339C22.2606 12.2273 22.2606 11.7708 22.0938 11.3642C20.465 7.39489 16.5618 4.59944 12.0056 4.59944C7.44948 4.59944 3.54623 7.39489 1.91749 11.3642C1.75062 11.7708 1.75062 12.2273 1.91749 12.6339C3.54623 16.6032 7.44948 19.3987 12.0056 19.3987C16.5618 19.3987 20.465 16.6032 22.0938 12.6339ZM11.9999 8.09999C9.84599 8.09999 8.09992 9.84606 8.09992 12C8.09992 14.1538 9.84599 15.8999 11.9999 15.8999C14.1538 15.8999 15.8998 14.1538 15.8998 12C15.8998 9.84606 14.1538 8.09999 11.9999 8.09999Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeFill;
