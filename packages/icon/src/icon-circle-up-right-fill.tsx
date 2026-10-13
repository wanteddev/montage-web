import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 위쪽 화살표를 표현합니다. 외부 링크 연결과 같은 액션을 강조하여 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, 꺽쇠, Outward, 오른쪽 위, 대각선, Right, External Link, Circle, 오른쪽, 우측, 외부링크, 원형, 바로가기
 * 속성: Solid
 */
const IconCircleUpRightFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.0005 2.09961C17.4679 2.09984 21.9009 6.53253 21.9009 12C21.9007 17.4673 17.4678 21.9002 12.0005 21.9004C6.53302 21.9004 2.10031 17.4674 2.1001 12C2.1001 6.53238 6.53289 2.09961 12.0005 2.09961ZM9.30029 8.39941C8.80327 8.39945 8.3999 8.80277 8.3999 9.2998C8.40005 9.79672 8.80335 10.1992 9.30029 10.1992H12.5278L8.66357 14.0635C8.31255 14.4149 8.31239 14.9846 8.66357 15.3359C9.01502 15.6874 9.58554 15.6873 9.93701 15.3359L13.8003 11.4727V14.6992C13.8004 15.1962 14.2037 15.5996 14.7007 15.5996C15.1975 15.5994 15.6 15.1961 15.6001 14.6992V9.2998C15.6001 8.80289 15.1975 8.39964 14.7007 8.39941H9.30029Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleUpRightFill;
