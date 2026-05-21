import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M11.3637 21.1362C11.7152 21.4877 12.285 21.4877 12.6365 21.1362L19.6365 14.1363C19.9879 13.7848 19.9879 13.2149 19.6365 12.8635C19.285 12.512 18.7151 12.512 18.3637 12.8635L12.9001 18.3271L12.9001 3.49985C12.9001 3.0028 12.4972 2.59985 12.0001 2.59985C11.503 2.59985 11.1001 3.0028 11.1001 3.49985V18.3271L5.63652 12.8635C5.28505 12.512 4.7152 12.512 4.36373 12.8635C4.01226 13.2149 4.01226 13.7848 4.36373 14.1363L11.3637 21.1362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDown;
