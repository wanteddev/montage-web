import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPersonFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.60002 7.25299C7.60002 4.82295 9.56996 2.85301 12 2.85301C14.43 2.85301 16.4 4.82295 16.4 7.25299C16.4 9.68303 14.43 11.653 12 11.653C9.56996 11.653 7.60002 9.68303 7.60002 7.25299Z"
        fill="currentColor"
      />
      <path
        d="M11.9999 13.5991C9.68799 13.5991 7.53056 14.0516 5.91629 14.9211C4.30316 15.7901 3.09997 17.1652 3.09997 18.999L3.09996 19.3267C3.09993 19.5134 3.0999 19.7034 3.11317 19.8658C3.12794 20.0466 3.16352 20.2708 3.27982 20.4991C3.43802 20.8095 3.69045 21.062 4.00094 21.2201C4.22919 21.3364 4.45344 21.372 4.63417 21.3867C4.79661 21.4 4.98664 21.4 5.17329 21.3999L18.8268 21.3991C19.0134 21.3991 19.2034 21.3992 19.3659 21.3859C19.5466 21.3711 19.7708 21.3355 19.999 21.2192C20.3095 21.061 20.5619 20.8086 20.7201 20.4981C20.8363 20.2699 20.8719 20.0457 20.8867 19.865C20.8999 19.7026 20.8999 19.5125 20.8999 19.3259L20.8999 18.999C20.8999 17.1652 19.6967 15.7901 18.0836 14.9211C16.4693 14.0516 14.3118 13.5991 11.9999 13.5991Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
