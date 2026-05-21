import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 순서를 변경할 때 사용합니다.
 * 키워드: Swap, 스왑, 변경, 바꾸기, 전환
 * 속성: Outlined
 */
const IconChange = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.3866 11.8858L20.1366 8.13576C20.488 7.78429 20.488 7.21444 20.1366 6.86297L16.3866 3.11297C16.0351 2.7615 15.4653 2.7615 15.1138 3.11297C14.7623 3.46444 14.7623 4.03429 15.1138 4.38576L17.3274 6.59937H4.50022C4.00316 6.59937 3.60022 7.00231 3.60022 7.49937C3.60022 7.99642 4.00316 8.39937 4.50022 8.39937H17.3274L15.1138 10.613C14.7623 10.9644 14.7623 11.5343 15.1138 11.8858C15.4653 12.2372 16.0351 12.2372 16.3866 11.8858Z"
        fill="currentColor"
      />
      <path
        d="M3.86382 17.1362C3.51235 16.7848 3.51235 16.2149 3.86382 15.8635L7.6138 12.1135C7.96527 11.762 8.53512 11.762 8.88659 12.1135C9.23806 12.4649 9.23806 13.0348 8.88659 13.3862L6.673 15.5999H19.5002C19.9972 15.5999 20.4002 16.0028 20.4002 16.4999C20.4002 16.9969 19.9972 17.3999 19.5002 17.3999H6.673L8.88659 19.6135C9.23806 19.9649 9.23806 20.5348 8.88659 20.8862C8.53512 21.2377 7.96527 21.2377 7.6138 20.8862L3.86382 17.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChange;
