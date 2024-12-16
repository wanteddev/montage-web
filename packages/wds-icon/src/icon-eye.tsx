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
        d="M12.0057 8.09946C9.85178 8.09946 8.10569 9.84555 8.10569 11.9995C8.10569 14.1534 9.85178 15.8995 12.0057 15.8995C14.1596 15.8995 15.9057 14.1534 15.9057 11.9995C15.9057 9.84555 14.1596 8.09946 12.0057 8.09946ZM9.90569 11.9995C9.90569 10.8397 10.8459 9.89946 12.0057 9.89946C13.1655 9.89946 14.1057 10.8397 14.1057 11.9995C14.1057 13.1593 13.1655 14.0995 12.0057 14.0995C10.8459 14.0995 9.90569 13.1593 9.90569 11.9995Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0058 19.399C16.562 19.399 20.4653 16.6035 22.094 12.6342C22.2609 12.2275 22.2609 11.7711 22.094 11.3644C20.4653 7.39508 16.562 4.59961 12.0058 4.59961C7.44958 4.59961 3.5463 7.39508 1.91754 11.3644C1.75067 11.7711 1.75067 12.2275 1.91754 12.6342C3.5463 16.6035 7.44958 19.399 12.0058 19.399ZM3.60335 11.9993C4.97481 8.71093 8.22038 6.39961 12.0058 6.39961C15.7912 6.39961 19.0368 8.71093 20.4082 11.9993C19.0368 15.2877 15.7912 17.599 12.0058 17.599C8.22038 17.599 4.97481 15.2877 3.60335 11.9993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEye;
