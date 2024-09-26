import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconAlignRight = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.49983 4.60056C4.00278 4.60056 3.59984 5.0035 3.59984 5.50056C3.59984 5.99761 4.00278 6.40055 4.49983 6.40055H19.4998C19.9968 6.40055 20.3998 5.99761 20.3998 5.50056C20.3998 5.0035 19.9968 4.60056 19.4998 4.60056H4.49983Z"
        fill="currentColor"
      />
      <path
        d="M9.49981 8.93387C9.00275 8.93387 8.59981 9.33681 8.59981 9.83386C8.59981 10.3309 9.00275 10.7339 9.49981 10.7339H19.4998C19.9968 10.7339 20.3998 10.3309 20.3998 9.83386C20.3998 9.33681 19.9968 8.93387 19.4998 8.93387H9.49981Z"
        fill="currentColor"
      />
      <path
        d="M3.59984 14.1671C3.59984 13.6701 4.00278 13.2672 4.49983 13.2672H19.4998C19.9968 13.2672 20.3998 13.6701 20.3998 14.1671C20.3998 14.6642 19.9968 15.0671 19.4998 15.0671H4.49983C4.00278 15.0671 3.59984 14.6642 3.59984 14.1671Z"
        fill="currentColor"
      />
      <path
        d="M9.49981 17.6005C9.00275 17.6005 8.59981 18.0034 8.59981 18.5005C8.59981 18.9975 9.00275 19.4004 9.49981 19.4004H19.4998C19.9968 19.4004 20.3998 18.9975 20.3998 18.5005C20.3998 18.0034 19.9968 17.6005 19.4998 17.6005H9.49981Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconAlignRight;
