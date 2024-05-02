import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconNavigationSocial = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        d="M19.1126 7.13979C19.1126 9.0672 17.5496 10.6297 15.6215 10.6297C13.6934 10.6297 12.1304 9.0672 12.1304 7.13979C12.1304 5.21238 13.6934 3.6499 15.6215 3.6499C17.5496 3.6499 19.1126 5.21238 19.1126 7.13979Z"
        fill="currentColor"
      />
      <path
        d="M10.6406 8.51281C10.6406 10.2398 9.24011 11.6397 7.51255 11.6397C5.78499 11.6397 4.38452 10.2398 4.38452 8.51281C4.38452 6.78585 5.78499 5.38587 7.51255 5.38587C9.24011 5.38587 10.6406 6.78585 10.6406 8.51281Z"
        fill="currentColor"
      />
      <path
        d="M8.54623 13.2676C8.57416 13.2443 8.60209 13.2211 8.62536 13.2025C8.26694 13.1652 7.89456 13.1373 7.50821 13.1373C2.76961 13.1373 0 16.0828 0 18.8747C0 19.7588 0.591161 20.3451 1.47092 20.3451H6.28399C6.00005 19.8798 5.84179 19.3214 5.84179 18.7025C5.84179 16.697 6.82395 14.7147 8.54157 13.2629L8.54623 13.2676Z"
        fill="currentColor"
      />
      <path
        d="M10.5103 13.5886C11.8509 12.7976 13.5686 12.2997 15.6213 12.2997V12.3044C20.9092 12.3044 24 15.5849 24 18.7071C24 19.6936 23.3437 20.3497 22.3568 20.3497H8.88582C7.899 20.3497 7.24267 19.6936 7.24267 18.7071C7.24267 16.7993 8.40172 14.831 10.5103 13.5886Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconNavigationSocial;
