import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: 꺾쇠, 앞으로 가기, Chevron, Forward, Right, Small
 * 속성: Outlined
 */
const IconChevronRightSmall = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.8637 4.86346C8.51223 5.21493 8.51223 5.78478 8.8637 6.13625L14.7273 11.9999L8.8637 17.8635C8.51223 18.2149 8.51223 18.7848 8.8637 19.1362C9.21517 19.4877 9.78502 19.4877 10.1365 19.1362L16.6365 12.6362C16.988 12.2848 16.988 11.7149 16.6365 11.3635L10.1365 4.86346C9.78502 4.51199 9.21517 4.51199 8.8637 4.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightSmall;
