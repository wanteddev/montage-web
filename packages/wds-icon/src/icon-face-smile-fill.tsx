import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconFaceSmileFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.1 12.0001C2.1 6.53245 6.53236 2.10009 12 2.10009C17.4676 2.10009 21.8999 6.53245 21.8999 12.0001C21.8999 17.4676 17.4676 21.9 12 21.9C6.53236 21.9 2.1 17.4676 2.1 12.0001ZM9.99987 10.25C9.99987 10.9403 9.44023 11.5 8.74988 11.5C8.05952 11.5 7.49988 10.9403 7.49988 10.25C7.49988 9.55961 8.05952 8.99997 8.74988 8.99997C9.44023 8.99997 9.99987 9.55961 9.99987 10.25ZM16.4998 10.25C16.4998 10.9403 15.9402 11.5 15.2499 11.5C14.5595 11.5 13.9999 10.9403 13.9999 10.25C13.9999 9.55961 14.5595 8.99997 15.2499 8.99997C15.9402 8.99997 16.4998 9.55961 16.4998 10.25ZM9.31418 13.7993C9.06529 13.369 8.51474 13.222 8.08448 13.4709C7.65423 13.7198 7.50721 14.2703 7.75609 14.7006C8.60197 16.1629 10.1852 17.1499 12 17.1499C13.8148 17.1499 15.398 16.1629 16.2439 14.7006C16.4928 14.2703 16.3458 13.7198 15.9155 13.4709C15.4853 13.222 14.9347 13.369 14.6858 13.7993C14.1484 14.7282 13.1463 15.3499 12 15.3499C10.8537 15.3499 9.85154 14.7282 9.31418 13.7993Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFaceSmileFill;
