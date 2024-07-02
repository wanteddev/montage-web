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
        d="M9.8999 12.0001C9.8999 10.8403 10.8401 9.90009 11.9999 9.90009C13.1597 9.90009 14.0999 10.8403 14.0999 12.0001C14.0999 13.1599 13.1597 14.1001 11.9999 14.1001C10.8401 14.1001 9.8999 13.1599 9.8999 12.0001Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0938 12.634C22.2606 12.2274 22.2606 11.771 22.0938 11.3643C20.465 7.39501 16.5618 4.59956 12.0056 4.59956C7.44948 4.59956 3.54623 7.39501 1.91749 11.3643C1.75062 11.771 1.75062 12.2274 1.91749 12.634C3.54623 16.6033 7.44948 19.3988 12.0056 19.3988C16.5618 19.3988 20.465 16.6033 22.0938 12.634ZM11.9999 8.10011C9.84599 8.10011 8.09992 9.84618 8.09992 12.0001C8.09992 14.154 9.84599 15.9 11.9999 15.9C14.1538 15.9 15.8998 14.154 15.8998 12.0001C15.8998 9.84618 14.1538 8.10011 11.9999 8.10011Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeFill;
