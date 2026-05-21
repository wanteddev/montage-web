import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 내용을 추가할 때 사용합니다.
 * 키워드: Thick, Plus, 플러스, Add, Thick
 * 속성: Outlined
 */
const IconPlusThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9997 2.70215C12.7177 2.70215 13.2997 3.28418 13.2997 4.00215V10.7021H19.9997C20.7177 10.7021 21.2997 11.2842 21.2997 12.0021C21.2997 12.7201 20.7177 13.3021 19.9997 13.3021H13.2997V20.0021C13.2997 20.7201 12.7177 21.3021 11.9997 21.3021C11.2817 21.3021 10.6997 20.7201 10.6997 20.0021V13.3021H3.99971C3.28174 13.3021 2.69971 12.7201 2.69971 12.0021C2.69971 11.2842 3.28174 10.7021 3.99971 10.7021H10.6997V4.00215C10.6997 3.28418 11.2817 2.70215 11.9997 2.70215Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlusThick;
