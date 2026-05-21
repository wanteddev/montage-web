import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M18.0638 6.83945C18.0638 6.34239 17.6609 5.93945 17.1638 5.93945L7.51433 5.93947C7.01728 5.93947 6.61433 6.34241 6.61433 6.83947C6.61433 7.33652 7.01727 7.73947 7.51433 7.73947L14.991 7.73945L6.20357 16.5269C5.8521 16.8784 5.8521 17.4482 6.20357 17.7997C6.55504 18.1511 7.12488 18.1511 7.47636 17.7997L16.2638 9.01224L16.2638 16.4889C16.2638 16.986 16.6667 17.3889 17.1638 17.3889C17.6608 17.3889 18.0638 16.986 18.0638 16.4889L18.0638 6.83945Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpRight;
