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
        d="M10.3504 3.8996C9.02488 3.8996 7.95037 4.97411 7.95037 6.29959V16.0496C7.95037 18.2863 9.76361 20.0996 12.0004 20.0996C14.2371 20.0996 16.0504 18.2863 16.0504 16.0496V5.92983C16.0504 5.43277 16.4533 5.02983 16.9503 5.02983C17.4474 5.02983 17.8503 5.43277 17.8503 5.92983V16.0496C17.8503 19.2804 15.2312 21.8996 12.0004 21.8996C8.7695 21.8996 6.15037 19.2804 6.15037 16.0496V6.29959C6.15037 3.98 8.03078 2.0996 10.3504 2.0996C12.67 2.0996 14.5504 3.98 14.5504 6.29959V16.0007C14.5504 17.4091 13.4087 18.5507 12.0004 18.5507C10.592 18.5507 9.45037 17.4091 9.45037 16.0007V7.18564C9.45037 6.68858 9.85331 6.28564 10.3504 6.28564C10.8474 6.28564 11.2504 6.68858 11.2504 7.18564V16.0007C11.2504 16.4149 11.5861 16.7507 12.0004 16.7507C12.4146 16.7507 12.7504 16.4149 12.7504 16.0007V6.29959C12.7504 4.97411 11.6758 3.8996 10.3504 3.8996Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAttachment;
