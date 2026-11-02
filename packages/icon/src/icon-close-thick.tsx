import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M4.58096 4.58096C5.08864 4.07327 5.91175 4.07328 6.41944 4.58096L12.0002 10.1617L17.581 4.58096C18.0887 4.07328 18.9118 4.07327 19.4194 4.58096C19.9271 5.08864 19.9271 5.91175 19.4194 6.41943L13.8387 12.0002L19.4194 17.581C19.9271 18.0887 19.9271 18.9118 19.4194 19.4194C18.9118 19.9271 18.0887 19.9271 17.581 19.4194L12.0002 13.8387L6.41944 19.4194C5.91175 19.9271 5.08864 19.9271 4.58096 19.4194C4.07327 18.9118 4.07327 18.0887 4.58096 17.581L10.1617 12.0002L4.58096 6.41943C4.07327 5.91175 4.07327 5.08864 4.58096 4.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCloseThick;
