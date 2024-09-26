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
        d="M8.16441 2.59984C7.63456 2.59983 7.18336 2.59981 6.81294 2.63008C6.42378 2.66188 6.04518 2.73151 5.68325 2.91592C5.13759 3.19395 4.69395 3.63759 4.41591 4.18326C4.2315 4.54519 4.16187 4.92378 4.13007 5.31294C4.09981 5.68337 4.09982 6.13454 4.09983 6.66439V21.4997C4.09983 21.8248 4.27515 22.1247 4.55846 22.2841C4.84176 22.4435 5.18903 22.4378 5.46691 22.269L11.9998 18.3027L18.5327 22.269C18.8106 22.4378 19.1578 22.4435 19.4411 22.2841C19.7244 22.1247 19.8998 21.8248 19.8998 21.4997V6.66442C19.8998 6.13455 19.8998 5.68337 19.8695 5.31294C19.8377 4.92378 19.7681 4.54519 19.5837 4.18326C19.3056 3.63759 18.862 3.19395 18.3163 2.91592C17.9544 2.73151 17.5758 2.66188 17.1867 2.63008C16.8162 2.59981 16.3651 2.59983 15.8352 2.59984H8.16441Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBookmarkFill;
