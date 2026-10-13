import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M16.3864 11.8858L20.1364 8.13576C20.4879 7.78429 20.4879 7.21444 20.1364 6.86297L16.3864 3.11297C16.035 2.7615 15.4651 2.7615 15.1137 3.11297C14.7622 3.46444 14.7622 4.03429 15.1137 4.38576L17.3273 6.59937H4.50009C4.00304 6.59937 3.6001 7.00231 3.6001 7.49937C3.6001 7.99642 4.00304 8.39937 4.50009 8.39937H17.3273L15.1137 10.613C14.7622 10.9644 14.7622 11.5343 15.1137 11.8858C15.4651 12.2372 16.035 12.2372 16.3864 11.8858Z"
        fill="currentColor"
      />
      <path
        d="M3.8637 17.1362C3.51223 16.7848 3.51223 16.2149 3.8637 15.8635L7.61368 12.1135C7.96515 11.762 8.535 11.762 8.88647 12.1135C9.23794 12.4649 9.23794 13.0348 8.88647 13.3862L6.67288 15.5999H19.5C19.9971 15.5999 20.4 16.0028 20.4 16.4999C20.4 16.9969 19.9971 17.3999 19.5 17.3999H6.67288L8.88647 19.6135C9.23794 19.9649 9.23794 20.5348 8.88647 20.8862C8.535 21.2377 7.96515 21.2377 7.61368 20.8862L3.8637 17.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChange;
