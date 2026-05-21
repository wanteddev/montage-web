import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 닫을 때 사용합니다.
 * 키워드: Thick, 닫기, Close
 * 속성: Outlined
 */
const IconCloseThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.58077 4.58096C5.08846 4.07327 5.91157 4.07328 6.41925 4.58096L12 10.1617L17.5808 4.58096C18.0885 4.07328 18.9116 4.07327 19.4193 4.58096C19.9269 5.08864 19.9269 5.91175 19.4193 6.41943L13.8385 12.0002L19.4193 17.581C19.9269 18.0887 19.9269 18.9118 19.4193 19.4194C18.9116 19.9271 18.0885 19.9271 17.5808 19.4194L12 13.8387L6.41925 19.4194C5.91157 19.9271 5.08846 19.9271 4.58077 19.4194C4.07309 18.9118 4.07309 18.0887 4.58077 17.581L10.1615 12.0002L4.58077 6.41943C4.07309 5.91175 4.07309 5.08864 4.58077 4.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCloseThick;
