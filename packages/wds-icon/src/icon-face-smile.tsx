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
 * 속성: Outlined
 */
const IconFaceSmile = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.34665 13.4891C8.76688 13.2236 9.32274 13.3491 9.5882 13.7693C10.0945 14.5709 10.9858 15.1 12 15.1C13.0142 15.1 13.9055 14.5709 14.4118 13.7693C14.6773 13.3491 15.2331 13.2236 15.6534 13.4891C16.0736 13.7546 16.1991 14.3104 15.9336 14.7307C15.1114 16.0323 13.6574 16.9 12 16.9C10.3427 16.9 8.88865 16.0323 8.06641 14.7307C7.80095 14.3104 7.92642 13.7546 8.34665 13.4891Z"
        fill="currentColor"
      />
      <path
        d="M10.2499 10.25C10.2499 10.9404 9.69027 11.5 8.99991 11.5C8.30956 11.5 7.74992 10.9404 7.74992 10.25C7.74992 9.55964 8.30956 9 8.99991 9C9.69027 9 10.2499 9.55964 10.2499 10.25Z"
        fill="currentColor"
      />
      <path
        d="M16.2499 10.25C16.2499 10.9404 15.6902 11.5 14.9999 11.5C14.3095 11.5 13.7499 10.9404 13.7499 10.25C13.7499 9.55964 14.3095 9 14.9999 9C15.6902 9 16.2499 9.55964 16.2499 10.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09998 12.0001C2.09998 6.53248 6.53234 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53234 21.9001 2.09998 17.4677 2.09998 12.0001ZM11.9999 3.9001C7.52645 3.9001 3.89997 7.52659 3.89997 12.0001C3.89997 16.4736 7.52645 20.1001 11.9999 20.1001C16.4734 20.1001 20.0999 16.4736 20.0999 12.0001C20.0999 7.52659 16.4734 3.9001 11.9999 3.9001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmile;
