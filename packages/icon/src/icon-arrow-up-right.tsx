import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 위쪽 화살표를 표현합니다. 외부 링크로 연결되거나 새 창으로 이동을 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, 꺽쇠, Outward, 오른쪽 위, 대각선, Right, External Link, 링크, 새창, New Window, 외부링크, 바로가기, 이동, 화살표
 * 속성: Outlined
 */
const IconArrowUpRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M18.0637 6.84043C18.0637 6.34337 17.6608 5.94043 17.1637 5.94043L7.51427 5.94045C7.01722 5.94045 6.61427 6.34339 6.61427 6.84045C6.61427 7.3375 7.01721 7.74044 7.51427 7.74044L14.991 7.74043L6.20351 16.5279C5.85203 16.8793 5.85203 17.4492 6.2035 17.8006C6.55498 18.1521 7.12482 18.1521 7.47629 17.8006L16.2637 9.01322L16.2637 16.4899C16.2637 16.987 16.6667 17.3899 17.1637 17.3899C17.6608 17.3899 18.0637 16.987 18.0637 16.4899L18.0637 6.84043Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpRight;
