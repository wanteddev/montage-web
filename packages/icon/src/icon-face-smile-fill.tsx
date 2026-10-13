import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 긍정적인 웃는 얼굴을 표현합니다.
 * 키워드: 스마일, 웃는 얼굴, 웃음, 나이스, Smile, Face, Good, Nice
 * 속성: Solid
 */
const IconFaceSmileFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.1001 12.0001C2.1001 6.53248 6.53246 2.1001 12.0001 2.1001C17.4677 2.1001 21.9 6.53248 21.9 12.0001C21.9 17.4677 17.4677 21.9001 12.0001 21.9001C6.53246 21.9001 2.1001 17.4677 2.1001 12.0001ZM9.99997 10.25C9.99997 10.9404 9.44033 11.5 8.74997 11.5C8.05962 11.5 7.49998 10.9404 7.49998 10.25C7.49998 9.55964 8.05962 9 8.74997 9C9.44033 9 9.99997 9.55964 9.99997 10.25ZM16.4999 10.25C16.4999 10.9404 15.9403 11.5 15.2499 11.5C14.5596 11.5 14 10.9404 14 10.25C14 9.55964 14.5596 9 15.2499 9C15.9403 9 16.4999 9.55964 16.4999 10.25ZM9.31428 13.7993C9.06539 13.3691 8.51484 13.2221 8.08458 13.471C7.65433 13.7198 7.5073 14.2704 7.75619 14.7007C8.60206 16.1629 10.1853 17.15 12.0001 17.15C13.8149 17.15 15.3981 16.1629 16.244 14.7007C16.4929 14.2704 16.3459 13.7198 15.9156 13.471C15.4853 13.2221 14.9348 13.3691 14.6859 13.7993C14.1485 14.7283 13.1464 15.35 12.0001 15.35C10.8538 15.35 9.85164 14.7283 9.31428 13.7993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmileFill;
