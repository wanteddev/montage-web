import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconPlay = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M10.3337 18.6303C8.75041 19.5704 7.95878 20.0404 7.30792 19.9776C6.74033 19.9229 6.22311 19.6284 5.88625 19.1683C5.49997 18.6407 5.49997 17.7201 5.49997 15.8788V8.12194C5.49997 6.28063 5.49997 5.35998 5.88625 4.83238C6.22311 4.3723 6.74033 4.07787 7.30792 4.02312C7.95878 3.96033 8.75041 4.43036 10.3337 5.37042L16.8657 9.24884C18.3922 10.1551 19.1554 10.6083 19.4135 11.1958C19.6388 11.7085 19.6388 12.2922 19.4135 12.8049C19.1554 13.3924 18.3922 13.8456 16.8657 14.7519L10.3337 18.6303Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlay;
