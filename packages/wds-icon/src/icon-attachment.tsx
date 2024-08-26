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
        d="M10.3504 3.89961C9.02491 3.89961 7.95039 4.97413 7.95039 6.29961V16.0496C7.95039 18.2864 9.76364 20.0996 12.0004 20.0996C14.2371 20.0996 16.0504 18.2864 16.0504 16.0496V5.92984C16.0504 5.43279 16.4533 5.02984 16.9504 5.02984C17.4474 5.02984 17.8504 5.43279 17.8504 5.92984V16.0496C17.8504 19.2805 15.2313 21.8996 12.0004 21.8996C8.76953 21.8996 6.15039 19.2805 6.15039 16.0496V6.29961C6.15039 3.98001 8.0308 2.09961 10.3504 2.09961C12.67 2.09961 14.5504 3.98001 14.5504 6.29961V16.0008C14.5504 17.4091 13.4087 18.5508 12.0004 18.5508C10.5921 18.5508 9.45039 17.4091 9.45039 16.0008V7.18566C9.45039 6.6886 9.85333 6.28566 10.3504 6.28566C10.8474 6.28566 11.2504 6.6886 11.2504 7.18566V16.0008C11.2504 16.415 11.5862 16.7508 12.0004 16.7508C12.4146 16.7508 12.7504 16.415 12.7504 16.0008V6.29961C12.7504 4.97413 11.6759 3.89961 10.3504 3.89961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAttachment;
