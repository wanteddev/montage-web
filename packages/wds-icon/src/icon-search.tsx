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
        d="M9.99967 2.0996C5.63665 2.0996 2.09972 5.63653 2.09972 9.99956C2.09972 14.3626 5.63665 17.8995 9.99967 17.8995C11.857 17.8995 13.5646 17.2586 14.9133 16.1858L19.8634 21.1359C20.2148 21.4873 20.7847 21.4873 21.1361 21.1359C21.4876 20.7844 21.4876 20.2145 21.1361 19.8631L16.1861 14.913C17.2588 13.5643 17.8996 11.8568 17.8996 9.99956C17.8996 5.63653 14.3627 2.0996 9.99967 2.0996ZM3.89971 9.99956C3.89971 6.63064 6.63076 3.89959 9.99967 3.89959C13.3686 3.89959 16.0996 6.63064 16.0996 9.99956C16.0996 13.3685 13.3686 16.0995 9.99967 16.0995C6.63076 16.0995 3.89971 13.3685 3.89971 9.99956Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
