import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconSearchThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.99989 1.70019C5.41596 1.70019 1.69994 5.4162 1.69994 10.0001C1.69994 14.5841 5.41596 18.3001 9.99989 18.3001C11.8228 18.3001 13.5084 17.7124 14.8777 16.7162L19.5807 21.4193C20.0884 21.927 20.9115 21.927 21.4192 21.4193C21.9269 20.9116 21.9269 20.0885 21.4192 19.5808L16.7161 14.8777C17.7122 13.5085 18.2998 11.8229 18.2998 10.0001C18.2998 5.4162 14.5838 1.70019 9.99989 1.70019ZM4.29993 10.0001C4.29993 6.85214 6.85189 4.30017 9.99989 4.30017C13.1479 4.30017 15.6999 6.85214 15.6999 10.0001C15.6999 13.1482 13.1479 15.7001 9.99989 15.7001C6.85189 15.7001 4.29993 13.1482 4.29993 10.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearchThick;
