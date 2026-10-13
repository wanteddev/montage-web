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
        d="M8.34683 13.4891C8.76706 13.2236 9.32293 13.3491 9.58838 13.7693C10.0947 14.5709 10.986 15.1 12.0002 15.1C13.0144 15.1 13.9057 14.5709 14.412 13.7693C14.6775 13.3491 15.2333 13.2236 15.6536 13.4891C16.0738 13.7546 16.1993 14.3104 15.9338 14.7307C15.1116 16.0323 13.6575 16.9 12.0002 16.9C10.3429 16.9 8.88883 16.0323 8.06659 14.7307C7.80113 14.3104 7.9266 13.7546 8.34683 13.4891Z"
        fill="currentColor"
      />
      <path
        d="M10.2501 10.25C10.2501 10.9404 9.69045 11.5 9.0001 11.5C8.30974 11.5 7.7501 10.9404 7.7501 10.25C7.7501 9.55964 8.30974 9 9.0001 9C9.69045 9 10.2501 9.55964 10.2501 10.25Z"
        fill="currentColor"
      />
      <path
        d="M16.2501 10.25C16.2501 10.9404 15.6904 11.5 15.0001 11.5C14.3097 11.5 13.7501 10.9404 13.7501 10.25C13.7501 9.55964 14.3097 9 15.0001 9C15.6904 9 16.2501 9.55964 16.2501 10.25Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.10016 12.0001C2.10016 6.53248 6.53252 2.1001 12.0001 2.1001C17.4677 2.1001 21.9001 6.53248 21.9001 12.0001C21.9001 17.4677 17.4677 21.9001 12.0001 21.9001C6.53252 21.9001 2.10016 17.4677 2.10016 12.0001ZM12.0001 3.9001C7.52663 3.9001 3.90015 7.52659 3.90015 12.0001C3.90015 16.4736 7.52663 20.1001 12.0001 20.1001C16.4736 20.1001 20.1001 16.4736 20.1001 12.0001C20.1001 7.52659 16.4736 3.9001 12.0001 3.9001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmile;
