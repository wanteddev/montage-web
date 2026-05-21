import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: 왼쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Left
 * 속성: Outlined
 */
const IconChevronDoubleLeft = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6366 4.63894C11.988 4.28746 11.988 3.71761 11.6366 3.36614C11.2851 3.01467 10.7152 3.01467 10.3638 3.36614L2.36376 11.3661C2.01229 11.7176 2.01229 12.2875 2.36376 12.6389L10.3638 20.6389C10.7152 20.9904 11.2851 20.9904 11.6366 20.6389C11.988 20.2875 11.988 19.7176 11.6366 19.3661L4.27295 12.0025L11.6366 4.63894ZM21.1366 4.63933C21.4881 4.28785 21.4881 3.71801 21.1366 3.36653C20.7851 3.01506 20.2153 3.01506 19.8638 3.36653L11.8638 11.3665C11.5123 11.718 11.5123 12.2879 11.8638 12.6393L19.8638 20.6393C20.2153 20.9908 20.7851 20.9908 21.1366 20.6393C21.4881 20.2879 21.4881 19.718 21.1366 19.3665L13.773 12.0029L21.1366 4.63933Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDoubleLeft;
