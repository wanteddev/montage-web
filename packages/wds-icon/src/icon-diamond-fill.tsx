import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconDiamondFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.8286 3.99947C5.80846 4.02366 5.78869 4.04759 5.76924 4.07113L5.70918 4.14362L2.39393 8.12191C2.15384 8.40992 1.92283 8.68704 1.75991 8.94185C1.72748 8.99258 1.69578 9.04531 1.66562 9.10016H10.0792L5.8286 3.99947Z"
        fill="currentColor"
      />
      <path
        d="M1.6965 10.9002C1.73146 10.9586 1.7682 11.0144 1.80571 11.0678C1.97945 11.3154 2.22217 11.5823 2.47444 11.8597L9.89073 20.0176C10.2051 20.3635 10.5007 20.6888 10.7776 20.9196C10.8757 21.0014 10.9829 21.0813 11.1002 21.1521V10.9002H1.6965Z"
        fill="currentColor"
      />
      <path
        d="M12.9002 21.1522C13.0176 21.0813 13.1248 21.0014 13.2229 20.9196C13.4998 20.6888 13.7954 20.3636 14.1097 20.0177L21.5261 11.8597C21.7784 11.5823 22.0211 11.3154 22.1948 11.0678C22.2323 11.0144 22.2691 10.9586 22.304 10.9002H12.9002V21.1522Z"
        fill="currentColor"
      />
      <path
        d="M22.3349 9.10016C22.3048 9.04531 22.2731 8.99258 22.2406 8.94185C22.0777 8.68705 21.8467 8.40994 21.6066 8.12194L18.2914 4.14362L18.2313 4.07112C18.2118 4.04757 18.1921 4.02363 18.1719 3.99942L13.9213 9.10016H22.3349Z"
        fill="currentColor"
      />
      <path
        d="M16.5725 3.10702C16.4284 3.09875 16.2883 3.09934 16.1577 3.09989L16.0635 3.10016H7.93702L7.84287 3.09989C7.71217 3.09934 7.5721 3.09875 7.42797 3.10702L12.0002 8.59374L16.5725 3.10702Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDiamondFill;
