import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M11.6365 4.63894C11.988 4.28746 11.988 3.71761 11.6365 3.36614C11.285 3.01467 10.7152 3.01467 10.3637 3.36614L2.3637 11.3661C2.01223 11.7176 2.01223 12.2875 2.3637 12.6389L10.3637 20.6389C10.7152 20.9904 11.285 20.9904 11.6365 20.6389C11.988 20.2875 11.988 19.7176 11.6365 19.3661L4.27289 12.0025L11.6365 4.63894ZM21.1365 4.63933C21.488 4.28785 21.488 3.71801 21.1365 3.36653C20.785 3.01506 20.2152 3.01506 19.8637 3.36653L11.8637 11.3665C11.5123 11.718 11.5123 12.2879 11.8637 12.6393L19.8637 20.6393C20.2152 20.9908 20.785 20.9908 21.1365 20.6393C21.488 20.2879 21.488 19.718 21.1365 19.3665L13.7729 12.0029L21.1365 4.63933Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconChevronDoubleLeft;
