import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 위쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Top, Thick
 * 속성: Outlined
 */
const IconArrowUpThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0808 2.58059C11.5885 2.07291 12.4116 2.07291 12.9193 2.58059L19.9193 9.58059C20.427 10.0883 20.427 10.9114 19.9193 11.4191C19.4116 11.9267 18.5885 11.9267 18.0808 11.4191L13.3001 6.63831V20.4998C13.3001 21.2178 12.718 21.7998 12.0001 21.7998C11.2821 21.7998 10.7001 21.2178 10.7001 20.4998V6.63831L5.91933 11.4191C5.41165 11.9267 4.58854 11.9267 4.08086 11.4191C3.57318 10.9114 3.57318 10.0883 4.08086 9.58059L11.0808 2.58059Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowUpThick;
