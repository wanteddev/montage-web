import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconSearch = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.99967 2.10009C5.63665 2.10009 2.09972 5.63702 2.09972 10C2.09972 14.3631 5.63665 17.9 9.99967 17.9C11.857 17.9 13.5646 17.2591 14.9133 16.1863L19.8634 21.1363C20.2148 21.4878 20.7847 21.4878 21.1361 21.1363C21.4876 20.7849 21.4876 20.215 21.1361 19.8636L16.1861 14.9135C17.2588 13.5648 17.8996 11.8572 17.8996 10C17.8996 5.63702 14.3627 2.10009 9.99967 2.10009ZM3.89971 10C3.89971 6.63113 6.63076 3.90008 9.99967 3.90008C13.3686 3.90008 16.0996 6.63113 16.0996 10C16.0996 13.369 13.3686 16.1 9.99967 16.1C6.63076 16.1 3.89971 13.369 3.89971 10Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
