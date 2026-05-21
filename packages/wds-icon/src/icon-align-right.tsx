import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 정렬을 표현합니다.
 * 키워드: Paragraph, 얼라인, Align, 오른쪽 정렬, Right
 * 속성: Outlined
 */
const IconAlignRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49985 4.60034C4.0028 4.60034 3.59985 5.00329 3.59985 5.50034C3.59985 5.9974 4.0028 6.40034 4.49985 6.40034H19.4999C19.9969 6.40034 20.3999 5.9974 20.3999 5.50034C20.3999 5.00329 19.9969 4.60034 19.4999 4.60034H4.49985Z"
        fill="currentColor"
      />
      <path
        d="M9.49985 8.93367C9.0028 8.93367 8.59985 9.33661 8.59985 9.83367C8.59985 10.3307 9.0028 10.7337 9.49985 10.7337H19.4999C19.9969 10.7337 20.3999 10.3307 20.3999 9.83367C20.3999 9.33661 19.9969 8.93367 19.4999 8.93367H9.49985Z"
        fill="currentColor"
      />
      <path
        d="M3.59985 14.167C3.59985 13.6699 4.0028 13.267 4.49985 13.267H19.4999C19.9969 13.267 20.3999 13.6699 20.3999 14.167C20.3999 14.664 19.9969 15.067 19.4999 15.067H4.49985C4.0028 15.067 3.59985 14.664 3.59985 14.167Z"
        fill="currentColor"
      />
      <path
        d="M9.49985 17.6003C9.0028 17.6003 8.59985 18.0032 8.59985 18.5003C8.59985 18.9974 9.0028 19.4003 9.49985 19.4003H19.4999C19.9969 19.4003 20.3999 18.9974 20.3999 18.5003C20.3999 18.0032 19.9969 17.6003 19.4999 17.6003H9.49985Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignRight;
