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
 * 속성: Outlined
 */
const IconCircleUpRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M14.7007 8.39941C15.1975 8.39964 15.6001 8.80289 15.6001 9.2998V14.6992C15.6001 15.1961 15.1975 15.5994 14.7007 15.5996C14.2036 15.5996 13.8003 15.1963 13.8003 14.6992V11.4727L9.93701 15.3359C9.58554 15.6874 9.01504 15.6874 8.66357 15.3359C8.31236 14.9846 8.31246 14.4149 8.66357 14.0635L12.5278 10.1992H9.30029C8.80329 10.1992 8.39998 9.79679 8.3999 9.2998C8.3999 8.80275 8.80324 8.39941 9.30029 8.39941H14.7007Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0005 2.09961C17.4679 2.09984 21.9009 6.53253 21.9009 12C21.9007 17.4673 17.4678 21.9002 12.0005 21.9004C6.53302 21.9004 2.10031 17.4674 2.1001 12C2.1001 6.53238 6.53289 2.09961 12.0005 2.09961ZM12.0005 3.90039C7.527 3.90039 3.90088 7.52649 3.90088 12C3.90109 16.4733 7.52713 20.0996 12.0005 20.0996C16.4736 20.0994 20.0999 16.4732 20.1001 12C20.1001 7.52663 16.4738 3.90062 12.0005 3.90039Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleUpRight;
