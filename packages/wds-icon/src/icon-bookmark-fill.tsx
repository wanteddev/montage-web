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
        d="M8.16445 2.59985C7.6346 2.59984 7.1834 2.59983 6.81297 2.63009C6.42381 2.66189 6.04522 2.73152 5.68328 2.91594C5.13761 3.19397 4.69397 3.63761 4.41594 4.18328C4.23152 4.54522 4.16189 4.92381 4.13009 5.31297C4.09983 5.6834 4.09984 6.13457 4.09985 6.66442V21.4999C4.09985 21.8249 4.27517 22.1248 4.55848 22.2842C4.84179 22.4436 5.18905 22.4379 5.46694 22.2692L11.9999 18.3027L18.5328 22.2692C18.8107 22.4379 19.1579 22.4436 19.4412 22.2842C19.7245 22.1248 19.8999 21.8249 19.8999 21.4999V6.66445C19.8999 6.13458 19.8999 5.6834 19.8696 5.31297C19.8378 4.92381 19.7682 4.54522 19.5838 4.18328C19.3057 3.63761 18.8621 3.19397 18.3164 2.91594C17.9545 2.73152 17.5759 2.66189 17.1867 2.63009C16.8163 2.59983 16.3651 2.59984 15.8353 2.59985H8.16445Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBookmarkFill;
