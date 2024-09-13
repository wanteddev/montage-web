import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconMoon = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.76131 2.54296C10.0164 2.81236 10.08 3.21069 9.92157 3.54615C9.42707 4.59301 9.1501 5.76348 9.1501 7.00115C9.1501 11.4747 12.7766 15.1011 17.2501 15.1011C18.3319 15.1011 19.362 14.8896 20.303 14.5064C20.6466 14.3665 21.0408 14.4517 21.2959 14.7211C21.551 14.9905 21.6146 15.3888 21.4562 15.7243C19.8723 19.0775 16.4584 21.4005 12.5001 21.4005C7.03248 21.4005 2.6001 16.9681 2.6001 11.5005C2.6001 7.35162 5.15198 3.80089 8.76835 2.32821C9.11196 2.18829 9.50623 2.27355 9.76131 2.54296ZM7.53222 5.10214C5.62565 6.58467 4.4001 8.9001 4.4001 11.5005C4.4001 15.974 8.02659 19.6005 12.5001 19.6005C14.9431 19.6005 17.1345 18.519 18.6202 16.807C18.1722 16.8691 17.7147 16.9011 17.2501 16.9011C11.7825 16.9011 7.3501 12.4688 7.3501 7.00115C7.3501 6.35203 7.41268 5.71707 7.53222 5.10214Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoon;
