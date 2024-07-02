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
        d="M7.60002 7.2525C7.60002 4.82246 9.56996 2.85252 12 2.85252C14.43 2.85252 16.4 4.82246 16.4 7.2525C16.4 9.68254 14.43 11.6525 12 11.6525C9.56996 11.6525 7.60002 9.68254 7.60002 7.2525Z"
        fill="currentColor"
      />
      <path
        d="M11.9999 13.5986C9.68799 13.5986 7.53056 14.0511 5.91629 14.9207C4.30316 15.7896 3.09997 17.1647 3.09997 18.9985L3.09996 19.3262C3.09993 19.5129 3.0999 19.7029 3.11317 19.8654C3.12794 20.0461 3.16352 20.2703 3.27982 20.4986C3.43802 20.809 3.69045 21.0615 4.00094 21.2196C4.22919 21.3359 4.45344 21.3715 4.63417 21.3863C4.79661 21.3995 4.98664 21.3995 5.17329 21.3994L18.8268 21.3986C19.0134 21.3986 19.2034 21.3987 19.3659 21.3854C19.5466 21.3706 19.7708 21.335 19.999 21.2187C20.3095 21.0605 20.5619 20.8081 20.7201 20.4977C20.8363 20.2694 20.8719 20.0452 20.8867 19.8645C20.8999 19.7021 20.8999 19.5121 20.8999 19.3254L20.8999 18.9985C20.8999 17.1647 19.6967 15.7896 18.0836 14.9207C16.4693 14.0511 14.3118 13.5986 11.9999 13.5986Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPersonFill;
