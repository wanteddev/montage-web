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
        d="M9.99973 2.0996C5.63669 2.0996 2.09976 5.63655 2.09976 9.99958C2.09976 14.3626 5.63669 17.8996 9.99973 17.8996C11.857 17.8996 13.5646 17.2586 14.9134 16.1859L19.8634 21.1359C20.2149 21.4874 20.7848 21.4874 21.1362 21.1359C21.4877 20.7844 21.4877 20.2146 21.1362 19.8631L16.1862 14.9131C17.2588 13.5643 17.8997 11.8568 17.8997 9.99958C17.8997 5.63655 14.3628 2.0996 9.99973 2.0996ZM3.89975 9.99958C3.89975 6.63066 6.6308 3.8996 9.99973 3.8996C13.3687 3.8996 16.0997 6.63066 16.0997 9.99958C16.0997 13.3685 13.3687 16.0996 9.99973 16.0996C6.6308 16.0996 3.89975 13.3685 3.89975 9.99958Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearch;
