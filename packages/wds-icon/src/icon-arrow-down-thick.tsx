import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 아래쪽 화살표를 표현합니다.
 * 키워드: 애로우, Arrow, 화살표, Bottom, Thick
 * 속성: Outlined
 */
const IconArrowDownThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.0808 21.4192C11.5885 21.9269 12.4116 21.9269 12.9193 21.4192L19.9193 14.4192C20.427 13.9115 20.427 13.0884 19.9193 12.5807C19.4116 12.073 18.5885 12.073 18.0808 12.5807L13.3001 17.3615V3.49995C13.3001 2.78198 12.718 2.19995 12.0001 2.19995C11.2821 2.19995 10.7001 2.78198 10.7001 3.49995V17.3615L5.91933 12.5807C5.41165 12.073 4.58854 12.073 4.08086 12.5807C3.57318 13.0884 3.57318 13.9115 4.08086 14.4192L11.0808 21.4192Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconArrowDownThick;
