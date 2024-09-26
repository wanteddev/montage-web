import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconEye = forwardRef<SVGSVGElement, Props>((props, ref) => {
  return (
    <Box
      as="svg"
      viewBox="0 0 25 24"
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
        d="M12.0057 8.09934C9.85175 8.09934 8.10566 9.84543 8.10566 11.9993C8.10566 14.1533 9.85175 15.8993 12.0057 15.8993C14.1596 15.8993 15.9057 14.1533 15.9057 11.9993C15.9057 9.84543 14.1596 8.09934 12.0057 8.09934ZM9.90566 11.9993C9.90566 10.8395 10.8459 9.89934 12.0057 9.89934C13.1655 9.89934 14.1057 10.8395 14.1057 11.9993C14.1057 13.1591 13.1655 14.0993 12.0057 14.0993C10.8459 14.0993 9.90566 13.1591 9.90566 11.9993Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0058 19.3989C16.562 19.3989 20.4652 16.6034 22.094 12.634C22.2609 12.2274 22.2609 11.771 22.094 11.3643C20.4652 7.39496 16.562 4.59949 12.0058 4.59949C7.44955 4.59949 3.54627 7.39496 1.91751 11.3643C1.75064 11.771 1.75064 12.2274 1.91751 12.634C3.54627 16.6034 7.44955 19.3989 12.0058 19.3989ZM3.60332 11.9992C4.97478 8.71081 8.22035 6.39949 12.0058 6.39949C15.7912 6.39949 19.0367 8.71081 20.4082 11.9992C19.0367 15.2875 15.7912 17.5989 12.0058 17.5989C8.22035 17.5989 4.97478 15.2875 3.60332 11.9992Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
