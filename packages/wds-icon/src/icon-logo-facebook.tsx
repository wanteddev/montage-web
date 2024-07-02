import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoFacebook = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9999 2.10009C6.53514 2.10009 2.09996 6.53526 2.09996 12C2.09996 16.9401 5.72335 21.0387 10.4555 21.7812V14.8611H7.94093V12H10.4555V9.82205C10.4555 7.33716 11.9306 5.97097 14.1977 5.97097C15.2768 5.97097 16.4153 6.16897 16.4153 6.16897V8.60435H15.1679C13.9403 8.60435 13.5542 9.36665 13.5542 10.1487V12.0099H16.2965L15.8609 14.871H13.5542V21.7911C18.2864 21.0486 21.8999 16.9401 21.8999 12C21.8999 6.53526 17.4746 2.10999 12.0098 2.10999L11.9999 2.10009Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoFacebook;
