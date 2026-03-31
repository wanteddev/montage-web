import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 모바일 환경 하단의 내비게이션 바에 들어가는 아이콘입니다.
 * 키워드: 소셜 내비게이션, Social navigation
 */
const IconNavigationSocial = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.1126 7.13979C19.1126 9.0672 17.5496 10.6297 15.6215 10.6297C13.6934 10.6297 12.1304 9.0672 12.1304 7.13979C12.1304 5.21238 13.6934 3.6499 15.6215 3.6499C17.5496 3.6499 19.1126 5.21238 19.1126 7.13979Z"
        fill="currentColor"
      />
      <path
        d="M10.6405 8.51281C10.6405 10.2398 9.24009 11.6397 7.51253 11.6397C5.78497 11.6397 4.3845 10.2398 4.3845 8.51281C4.3845 6.78585 5.78497 5.38587 7.51253 5.38587C9.24009 5.38587 10.6405 6.78585 10.6405 8.51281Z"
        fill="currentColor"
      />
      <path
        d="M8.5462 13.2676C8.57413 13.2443 8.60206 13.2211 8.62534 13.2025C8.26692 13.1652 7.89453 13.1373 7.50819 13.1373C2.7696 13.1373 0 16.0828 0 18.8747C0 19.7588 0.591159 20.3451 1.47092 20.3451H6.28397C6.00003 19.8798 5.84177 19.3214 5.84177 18.7025C5.84177 16.697 6.82393 14.7147 8.54155 13.2629L8.5462 13.2676Z"
        fill="currentColor"
      />
      <path
        d="M10.5103 13.5886C11.8509 12.7976 13.5685 12.2997 15.6213 12.2997V12.3044C20.9091 12.3044 23.9999 15.5849 23.9999 18.7071C23.9999 19.6936 23.3436 20.3497 22.3568 20.3497H8.88579C7.89897 20.3497 7.24265 19.6936 7.24265 18.7071C7.24265 16.7993 8.40169 14.831 10.5103 13.5886Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationSocial;
