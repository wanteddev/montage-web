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
      <circle cx="11.9999" cy="11.9999" r="9.89995" fill="#0866FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5543 21.7785V14.8708H15.861L16.2966 12.0098H13.5543V10.1486C13.5543 9.36648 13.9404 8.60418 15.168 8.60418H16.4154V6.16879C16.4154 6.16879 15.2769 5.97079 14.1978 5.97079C11.9307 5.97079 10.4556 7.33699 10.4556 9.82188V11.9999H7.941V14.8609H10.4556V21.7801C10.9588 21.8589 11.4746 21.8998 12 21.8998C12.5288 21.8998 13.0479 21.8584 13.5543 21.7785Z"
        fill="white"
      />
    </Box>
  );
});

export default IconLogoFacebookColor;
