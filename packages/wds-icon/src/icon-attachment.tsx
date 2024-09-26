import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAttachment = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.3503 3.90008C9.02486 3.90008 7.95035 4.97459 7.95035 6.30006V16.05C7.95035 18.2868 9.76359 20.1 12.0003 20.1C14.2371 20.1 16.0503 18.2868 16.0503 16.05V5.9303C16.0503 5.43325 16.4533 5.0303 16.9503 5.0303C17.4474 5.0303 17.8503 5.43325 17.8503 5.9303V16.05C17.8503 19.2809 15.2312 21.9 12.0003 21.9C8.76948 21.9 6.15036 19.2809 6.15036 16.05V6.30006C6.15036 3.98048 8.03075 2.10009 10.3503 2.10009C12.6699 2.10009 14.5503 3.98048 14.5503 6.30006V16.0012C14.5503 17.4095 13.4086 18.5512 12.0003 18.5512C10.592 18.5512 9.45034 17.4095 9.45034 16.0012V7.18611C9.45034 6.68905 9.85328 6.28611 10.3503 6.28611C10.8474 6.28611 11.2503 6.68905 11.2503 7.18611V16.0012C11.2503 16.4154 11.5861 16.7512 12.0003 16.7512C12.4145 16.7512 12.7503 16.4154 12.7503 16.0012V6.30006C12.7503 4.97459 11.6758 3.90008 10.3503 3.90008Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAttachment;
