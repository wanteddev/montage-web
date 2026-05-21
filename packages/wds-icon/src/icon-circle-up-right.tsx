import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M14.7006 8.39941C15.1974 8.39964 15.6 8.80289 15.6 9.2998V14.6992C15.6 15.1961 15.1974 15.5994 14.7006 15.5996C14.2035 15.5996 13.8002 15.1963 13.8002 14.6992V11.4727L9.93689 15.3359C9.58541 15.6874 9.01492 15.6874 8.66345 15.3359C8.31224 14.9846 8.31234 14.4149 8.66345 14.0635L12.5277 10.1992H9.30017C8.80316 10.1992 8.39986 9.79679 8.39978 9.2998C8.39978 8.80275 8.80311 8.39941 9.30017 8.39941H14.7006Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0004 2.09961C17.4678 2.09984 21.9008 6.53253 21.9008 12C21.9005 17.4673 17.4676 21.9002 12.0004 21.9004C6.53289 21.9004 2.10019 17.4674 2.09998 12C2.09998 6.53238 6.53276 2.09961 12.0004 2.09961ZM12.0004 3.90039C7.52688 3.90039 3.90076 7.52649 3.90076 12C3.90097 16.4733 7.52701 20.0996 12.0004 20.0996C16.4735 20.0994 20.0998 16.4732 20.1 12C20.1 7.52663 16.4737 3.90062 12.0004 3.90039Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleUpRight;
