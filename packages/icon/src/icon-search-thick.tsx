import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M9.99968 1.7002C5.41573 1.7002 1.69971 5.41623 1.69971 10.0002C1.69971 14.5842 5.41573 18.3002 9.99968 18.3002C11.8226 18.3002 13.5082 17.7125 14.8775 16.7163L19.5805 21.4194C20.0882 21.9271 20.9113 21.9271 21.419 21.4194C21.9267 20.9117 21.9267 20.0886 21.419 19.5809L16.7159 14.8778C17.712 13.5086 18.2996 11.823 18.2996 10.0002C18.2996 5.41623 14.5836 1.7002 9.99968 1.7002ZM4.2997 10.0002C4.2997 6.85217 6.85166 4.3002 9.99968 4.3002C13.1477 4.3002 15.6997 6.85217 15.6997 10.0002C15.6997 13.1482 13.1477 15.7002 9.99968 15.7002C6.85166 15.7002 4.2997 13.1482 4.2997 10.0002Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearchThick;
