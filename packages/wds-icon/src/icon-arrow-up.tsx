import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, 꺽쇠, Top
 * 속성: Outlined
 */
const IconArrowUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.6365 2.86346C12.285 2.51199 11.7152 2.51199 11.3637 2.86346L4.36373 9.86345C4.01226 10.2149 4.01226 10.7848 4.36373 11.1362C4.7152 11.4877 5.28505 11.4877 5.63652 11.1362L11.1001 5.67265V20.4999C11.1001 20.9969 11.503 21.3999 12.0001 21.3999C12.4972 21.3999 12.9001 20.9969 12.9001 20.4999V5.67265L18.3637 11.1362C18.7151 11.4877 19.285 11.4877 19.6365 11.1362C19.9879 10.7848 19.9879 10.2149 19.6365 9.86345L12.6365 2.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUp;
