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
        d="M9.99992 1.70019C5.41597 1.70019 1.69995 5.41622 1.69995 10.0002C1.69995 14.5841 5.41597 18.3001 9.99992 18.3001C11.8228 18.3001 13.5085 17.7125 14.8777 16.7163L19.5808 21.4193C20.0885 21.927 20.9116 21.927 21.4193 21.4193C21.9269 20.9117 21.9269 20.0885 21.4193 19.5809L16.7162 14.8778C17.7123 13.5085 18.2999 11.823 18.2999 10.0002C18.2999 5.41622 14.5839 1.70019 9.99992 1.70019ZM4.29994 10.0002C4.29994 6.85215 6.85191 4.30018 9.99992 4.30018C13.1479 4.30018 15.6999 6.85215 15.6999 10.0002C15.6999 13.1482 13.1479 15.7002 9.99992 15.7002C6.85191 15.7002 4.29994 13.1482 4.29994 10.0002Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSearchThick;
