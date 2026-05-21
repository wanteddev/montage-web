import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M8.86382 4.86346C8.51235 5.21493 8.51235 5.78478 8.86382 6.13625L14.7274 11.9999L8.86382 17.8635C8.51235 18.2149 8.51235 18.7848 8.86382 19.1362C9.2153 19.4877 9.78514 19.4877 10.1366 19.1362L16.6366 12.6362C16.9881 12.2848 16.9881 11.7149 16.6366 11.3635L10.1366 4.86346C9.78514 4.51199 9.2153 4.51199 8.86382 4.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronRightSmall;
