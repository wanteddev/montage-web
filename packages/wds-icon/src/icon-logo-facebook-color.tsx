import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoFacebookColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
      <circle cx="11.9999" cy="12" r="9.89995" fill="#0866FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5543 21.7786V14.871H15.861L16.2966 12.0099H13.5543V10.1487C13.5543 9.3666 13.9404 8.6043 15.168 8.6043H16.4154V6.16892C16.4154 6.16892 15.2769 5.97092 14.1978 5.97092C11.9307 5.97092 10.4556 7.33711 10.4556 9.822V12H7.941V14.8611H10.4556V21.7802C10.9588 21.859 11.4746 21.8999 12 21.8999C12.5288 21.8999 13.0479 21.8585 13.5543 21.7786Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoFacebookColor;
