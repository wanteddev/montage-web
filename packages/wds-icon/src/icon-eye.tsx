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
        d="M12.0056 8.09946C9.85169 8.09946 8.1056 9.84555 8.1056 11.9995C8.1056 14.1534 9.85169 15.8995 12.0056 15.8995C14.1595 15.8995 15.9056 14.1534 15.9056 11.9995C15.9056 9.84555 14.1595 8.09946 12.0056 8.09946ZM9.9056 11.9995C9.9056 10.8397 10.8458 9.89946 12.0056 9.89946C13.1654 9.89946 14.1056 10.8397 14.1056 11.9995C14.1056 13.1593 13.1654 14.0995 12.0056 14.0995C10.8458 14.0995 9.9056 13.1593 9.9056 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0057 19.399C16.5619 19.399 20.4652 16.6035 22.0939 12.6342C22.2608 12.2275 22.2608 11.7711 22.0939 11.3644C20.4652 7.39508 16.5619 4.59961 12.0057 4.59961C7.44949 4.59961 3.5462 7.39508 1.91745 11.3644C1.75058 11.7711 1.75058 12.2275 1.91745 12.6342C3.5462 16.6035 7.44949 19.399 12.0057 19.399ZM3.60325 11.9993C4.97471 8.71093 8.22029 6.39961 12.0057 6.39961C15.7911 6.39961 19.0367 8.71093 20.4081 11.9993C19.0367 15.2877 15.7911 17.599 12.0057 17.599C8.22029 17.599 4.97471 15.2877 3.60325 11.9993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
