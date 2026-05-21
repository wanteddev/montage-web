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
        d="M12.0003 2.09961C17.4677 2.09984 21.9007 6.53253 21.9007 12C21.9005 17.4673 17.4676 21.9002 12.0003 21.9004C6.53283 21.9004 2.10013 17.4674 2.09991 12C2.09991 6.53238 6.5327 2.09961 12.0003 2.09961ZM9.30011 8.39941C8.80308 8.39945 8.39972 8.80277 8.39972 9.2998C8.39986 9.79672 8.80317 10.1992 9.30011 10.1992H12.5276L8.66339 14.0635C8.31237 14.4149 8.31221 14.9846 8.66339 15.3359C9.01483 15.6874 9.58536 15.6873 9.93683 15.3359L13.8001 11.4727V14.6992C13.8002 15.1962 14.2035 15.5996 14.7005 15.5996C15.1973 15.5994 15.5998 15.1961 15.5999 14.6992V9.2998C15.5999 8.80289 15.1974 8.39964 14.7005 8.39941H9.30011Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleUpRightFill;
