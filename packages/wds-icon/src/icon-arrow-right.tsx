import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Right
 * 속성: Outlined
 */
const IconArrowRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.1365 12.6362C21.4879 12.2848 21.4879 11.7149 21.1365 11.3635L14.1365 4.36346C13.785 4.01199 13.2152 4.01199 12.8637 4.36346C12.5122 4.71493 12.5122 5.28478 12.8637 5.63625L18.3273 11.0999H3.50012C3.00307 11.0999 2.60013 11.5028 2.60013 11.9999C2.60013 12.4969 3.00307 12.8999 3.50012 12.8999H18.3273L12.8637 18.3635C12.5122 18.7149 12.5122 19.2848 12.8637 19.6363C13.2152 19.9877 13.785 19.9877 14.1365 19.6362L21.1365 12.6362Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowRight;
