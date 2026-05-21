import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 검색 관련 정보를 표현하고 싶을 때 사용합니다.
 * 키워드: Thick, Find, 돋보기, 찾기, Search, Thick
 * 속성: Outlined
 */
const IconSearchThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.99992 1.7002C5.41597 1.7002 1.69995 5.41623 1.69995 10.0002C1.69995 14.5842 5.41597 18.3002 9.99992 18.3002C11.8228 18.3002 13.5085 17.7125 14.8777 16.7163L19.5808 21.4194C20.0885 21.9271 20.9116 21.9271 21.4193 21.4194C21.9269 20.9117 21.9269 20.0886 21.4193 19.5809L16.7162 14.8778C17.7123 13.5086 18.2999 11.823 18.2999 10.0002C18.2999 5.41623 14.5839 1.7002 9.99992 1.7002ZM4.29994 10.0002C4.29994 6.85217 6.85191 4.3002 9.99992 4.3002C13.1479 4.3002 15.6999 6.85217 15.6999 10.0002C15.6999 13.1482 13.1479 15.7002 9.99992 15.7002C6.85191 15.7002 4.29994 13.1482 4.29994 10.0002Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearchThick;
