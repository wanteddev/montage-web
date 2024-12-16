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
        d="M5.82858 3.99946C5.80844 4.02365 5.78867 4.04758 5.76923 4.07112L5.70916 4.14361L2.39393 8.12189C2.15384 8.4099 1.92282 8.68702 1.75991 8.94183C1.72747 8.99256 1.69577 9.04529 1.66561 9.10014H10.0791L5.82858 3.99946Z"
        fill="currentColor"
      />
      <path
        d="M1.6965 10.9001C1.73145 10.9585 1.7682 11.0144 1.8057 11.0678C1.97944 11.3154 2.22217 11.5823 2.47443 11.8597L9.89071 20.0176C10.205 20.3634 10.5007 20.6888 10.7776 20.9195C10.8757 21.0013 10.9829 21.0812 11.1002 21.1521V10.9001H1.6965Z"
        fill="currentColor"
      />
      <path
        d="M12.9002 21.1521C13.0176 21.0812 13.1248 21.0013 13.2229 20.9195C13.4998 20.6888 13.7954 20.3635 14.1097 20.0177L21.526 11.8597C21.7783 11.5823 22.021 11.3154 22.1948 11.0678C22.2323 11.0144 22.269 10.9585 22.304 10.9001H12.9002V21.1521Z"
        fill="currentColor"
      />
      <path
        d="M22.3349 9.10014C22.3047 9.04529 22.273 8.99256 22.2406 8.94183C22.0777 8.68703 21.8467 8.40992 21.6066 8.12192L18.2913 4.14361L18.2312 4.07111C18.2118 4.04756 18.192 4.02362 18.1719 3.99941L13.9212 9.10014H22.3349Z"
        fill="currentColor"
      />
      <path
        d="M16.5725 3.10701C16.4283 3.09874 16.2883 3.09933 16.1576 3.09988L16.0635 3.10015H7.937L7.84285 3.09988C7.71215 3.09933 7.57208 3.09874 7.42795 3.10702L12.0002 8.59371L16.5725 3.10701Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconDiamondFill;
