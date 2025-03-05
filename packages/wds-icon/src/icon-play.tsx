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
        d="M10.8337 18.6303C9.25042 19.5704 8.45879 20.0404 7.80792 19.9776C7.24034 19.9229 6.72311 19.6285 6.38626 19.1684C5.99998 18.6408 5.99998 17.7201 5.99998 15.8788V8.12195C5.99998 6.28064 5.99998 5.35999 6.38626 4.83239C6.72311 4.3723 7.24034 4.07788 7.80792 4.02313C8.45879 3.96034 9.25042 4.43037 10.8337 5.37043L17.3658 9.24885C18.8922 10.1552 19.6554 10.6083 19.9135 11.1958C20.1388 11.7085 20.1388 12.2922 19.9135 12.8049C19.6554 13.3924 18.8922 13.8456 17.3658 14.7519L10.8337 18.6303Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlay;
