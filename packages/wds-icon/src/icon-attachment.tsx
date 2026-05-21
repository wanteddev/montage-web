import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 첨부파일을 표현합니다.
 * 키워드: Paperclip, 클립
 * 속성: Outlined
 */
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
        d="M10.3504 3.89998C9.02491 3.89998 7.95039 4.97449 7.95039 6.29997V16.05C7.95039 18.2867 9.76364 20.1 12.0004 20.1C14.2371 20.1 16.0504 18.2867 16.0504 16.05V5.93021C16.0504 5.43315 16.4533 5.03021 16.9504 5.03021C17.4474 5.03021 17.8504 5.43315 17.8504 5.93021V16.05C17.8504 19.2808 15.2313 21.9 12.0004 21.9C8.76953 21.9 6.15039 19.2808 6.15039 16.05V6.29997C6.15039 3.98038 8.0308 2.09998 10.3504 2.09998C12.67 2.09998 14.5504 3.98038 14.5504 6.29997V16.0011C14.5504 17.4095 13.4087 18.5511 12.0004 18.5511C10.5921 18.5511 9.45039 17.4095 9.45039 16.0011V7.18602C9.45039 6.68897 9.85333 6.28602 10.3504 6.28602C10.8474 6.28602 11.2504 6.68897 11.2504 7.18602V16.0011C11.2504 16.4154 11.5862 16.7511 12.0004 16.7511C12.4146 16.7511 12.7504 16.4154 12.7504 16.0011V6.29997C12.7504 4.97449 11.6759 3.89998 10.3504 3.89998Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAttachment;
