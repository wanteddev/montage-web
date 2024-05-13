import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconListCategory = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M3.09998 5.7501C3.09998 5.25304 3.50292 4.8501 3.99998 4.8501H20C20.497 4.8501 20.9 5.25304 20.9 5.7501C20.9 6.24715 20.497 6.6501 20 6.6501H3.99998C3.50292 6.6501 3.09998 6.24715 3.09998 5.7501Z"
        fill="currentColor"
      />
      <path
        d="M3.09999 12.0001C3.09999 11.503 3.50293 11.1001 3.99999 11.1001H20C20.497 11.1001 20.9 11.503 20.9 12.0001C20.9 12.4972 20.497 12.9001 20 12.9001H3.99999C3.50293 12.9001 3.09999 12.4972 3.09999 12.0001Z"
        fill="currentColor"
      />
      <path
        d="M3.09998 18.2501C3.09998 17.753 3.50292 17.3501 3.99998 17.3501H13.75C14.247 17.3501 14.65 17.753 14.65 18.2501C14.65 18.7472 14.247 19.1501 13.75 19.1501H3.99998C3.50292 19.1501 3.09998 18.7472 3.09998 18.2501Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
