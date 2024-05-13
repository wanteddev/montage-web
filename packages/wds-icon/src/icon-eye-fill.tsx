import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconEyeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.89994 12.0002C9.89994 10.8404 10.8401 9.9002 11.9999 9.9002C13.1597 9.9002 14.0999 10.8404 14.0999 12.0002C14.0999 13.16 13.1597 14.1002 11.9999 14.1002C10.8401 14.1002 9.89994 13.16 9.89994 12.0002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0939 12.6342C22.2608 12.2275 22.2608 11.7711 22.0939 11.3644C20.4652 7.39508 16.5619 4.59961 12.0057 4.59961C7.44949 4.59961 3.5462 7.39508 1.91745 11.3644C1.75058 11.7711 1.75058 12.2275 1.91745 12.6342C3.5462 16.6035 7.44949 19.399 12.0057 19.399C16.5619 19.399 20.4652 16.6035 22.0939 12.6342ZM11.9999 8.10019C9.84603 8.10019 8.09994 9.84628 8.09994 12.0002C8.09994 14.1541 9.84603 15.9002 11.9999 15.9002C14.1539 15.9002 15.8999 14.1541 15.8999 12.0002C15.8999 9.84628 14.1539 8.10019 11.9999 8.10019Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeFill;
