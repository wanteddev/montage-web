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
        d="M10.3337 18.6303C8.75043 19.5704 7.95879 20.0404 7.30793 19.9776C6.74034 19.9229 6.22312 19.6285 5.88626 19.1684C5.49998 18.6408 5.49998 17.7201 5.49998 15.8788V8.12195C5.49998 6.28064 5.49998 5.35999 5.88626 4.83239C6.22312 4.3723 6.74034 4.07788 7.30793 4.02313C7.95879 3.96034 8.75042 4.43037 10.3337 5.37043L16.8658 9.24885C18.3922 10.1552 19.1554 10.6083 19.4135 11.1958C19.6388 11.7085 19.6388 12.2922 19.4135 12.8049C19.1554 13.3924 18.3922 13.8456 16.8658 14.7519L10.3337 18.6303Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconPlay;
