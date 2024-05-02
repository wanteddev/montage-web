import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCrownFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
      as="svg"
      ref={ref}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0001 2.59961C12.3417 2.59961 12.6537 2.79291 12.8059 3.09867L15.2012 7.91248L20.5676 4.97125C20.8757 4.80237 21.2539 4.82825 21.5361 5.03751C21.8184 5.24676 21.9531 5.60114 21.881 5.94503L19.631 16.6842C19.5437 17.101 19.1761 17.3996 18.7501 17.3996H5.25013C4.82421 17.3996 4.4566 17.101 4.36926 16.6842L2.11926 5.94503C2.04721 5.60114 2.18187 5.24676 2.46412 5.03751C2.74637 4.82825 3.12459 4.80237 3.4327 4.97125L8.79904 7.91248L11.1944 3.09867C11.3465 2.79291 11.6586 2.59961 12.0001 2.59961Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.60013 19.9996C4.60013 19.5026 5.00308 19.0996 5.50013 19.0996H18.5001C18.9972 19.0996 19.4001 19.5026 19.4001 19.9996C19.4001 20.4967 18.9972 20.8996 18.5001 20.8996H5.50013C5.00308 20.8996 4.60013 20.4967 4.60013 19.9996Z"
      />
    </Box>
  );
});

export default IconCrownFill;
