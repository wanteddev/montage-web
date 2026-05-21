import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M2.10001 12.0001C2.10001 6.53248 6.53237 2.1001 12 2.1001C17.4676 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4676 21.9001 12 21.9001C6.53237 21.9001 2.10001 17.4677 2.10001 12.0001ZM9.99988 10.25C9.99988 10.9404 9.44024 11.5 8.74988 11.5C8.05953 11.5 7.49989 10.9404 7.49989 10.25C7.49989 9.55964 8.05953 9 8.74988 9C9.44024 9 9.99988 9.55964 9.99988 10.25ZM16.4999 10.25C16.4999 10.9404 15.9402 11.5 15.2499 11.5C14.5595 11.5 13.9999 10.9404 13.9999 10.25C13.9999 9.55964 14.5595 9 15.2499 9C15.9402 9 16.4999 9.55964 16.4999 10.25ZM9.31419 13.7993C9.0653 13.3691 8.51475 13.2221 8.08449 13.471C7.65424 13.7198 7.50721 14.2704 7.7561 14.7007C8.60197 16.1629 10.1852 17.15 12 17.15C13.8148 17.15 15.398 16.1629 16.2439 14.7007C16.4928 14.2704 16.3458 13.7198 15.9155 13.471C15.4853 13.2221 14.9347 13.3691 14.6858 13.7993C14.1485 14.7283 13.1463 15.35 12 15.35C10.8537 15.35 9.85155 14.7283 9.31419 13.7993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmileFill;
