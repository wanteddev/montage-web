import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconBookmarkFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.16445 2.59984C7.6346 2.59983 7.1834 2.59982 6.81298 2.63008C6.42382 2.66188 6.04522 2.73151 5.68329 2.91593C5.13762 3.19396 4.69398 3.6376 4.41595 4.18327C4.23154 4.5452 4.1619 4.92379 4.13011 5.31295C4.09984 5.68337 4.09985 6.13454 4.09987 6.6644V21.4998C4.09987 21.8249 4.27518 22.1247 4.55849 22.2841C4.8418 22.4435 5.18907 22.4378 5.46695 22.2691L11.9998 18.3027L18.5327 22.2691C18.8106 22.4378 19.1579 22.4435 19.4412 22.2841C19.7245 22.1247 19.8998 21.8249 19.8998 21.4998V6.66442C19.8998 6.13456 19.8998 5.68338 19.8696 5.31295C19.8378 4.92379 19.7681 4.5452 19.5837 4.18327C19.3057 3.6376 18.8621 3.19396 18.3164 2.91593C17.9545 2.73151 17.5759 2.66188 17.1867 2.63008C16.8163 2.59982 16.3651 2.59983 15.8353 2.59984H8.16445Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBookmarkFill;
