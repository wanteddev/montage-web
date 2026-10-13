import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Bottom
 * 속성: Outlined
 */
const IconArrowDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.3637 21.1363C11.7151 21.4878 12.285 21.4878 12.6365 21.1363L19.6364 14.1363C19.9879 13.7848 19.9879 13.215 19.6364 12.8635C19.285 12.512 18.7151 12.5121 18.3636 12.8635L12.9001 18.3271L12.9001 3.49991C12.9001 3.00286 12.4971 2.59991 12.0001 2.59991C11.503 2.59991 11.1001 3.00286 11.1001 3.49991V18.3271L5.63649 12.8635C5.28502 12.5121 4.71517 12.512 4.3637 12.8635C4.01223 13.215 4.01223 13.7848 4.3637 14.1363L11.3637 21.1363Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDown;
