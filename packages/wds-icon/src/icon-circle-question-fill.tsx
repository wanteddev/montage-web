import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconCircleQuestionFill = forwardRef<SVGSVGElement, Props>(
  (props, ref) => {
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
          d="M2.0999 12C2.0999 6.53245 6.53226 2.10009 11.9998 2.10009C17.4674 2.10009 21.8998 6.53245 21.8998 12C21.8998 17.4676 17.4674 21.9 11.9998 21.9C6.53226 21.9 2.0999 17.4676 2.0999 12ZM11.1097 13.1164C11.0128 13.6408 11.4601 14.0799 11.9934 14.0799C12.5259 14.0799 12.9297 13.6327 13.1103 13.1318C13.3451 12.4806 13.8168 12.0841 14.2873 11.6886C14.946 11.1348 15.6024 10.583 15.6024 9.33745C15.6024 7.41463 14.0444 6.28222 12.0607 6.28222C10.2581 6.28222 8.89849 7.23256 8.50113 8.77524C8.36807 9.29184 8.81581 9.73265 9.34927 9.73265C9.88138 9.73265 10.2723 9.27232 10.519 8.80087C10.7842 8.29406 11.2942 8.00488 11.9847 7.99984C12.9348 8.00744 13.596 8.55464 13.596 9.41345C13.596 10.1104 13.1589 10.4457 12.6453 10.8397C12.0476 11.2982 11.3463 11.8362 11.1097 13.1164ZM10.7687 16.4663C10.7611 17.1503 11.2779 17.6519 11.9999 17.6519C12.7068 17.6519 13.2236 17.1503 13.2312 16.4663C13.2236 15.7823 12.7068 15.2807 11.9999 15.2807C11.2779 15.2807 10.7611 15.7823 10.7687 16.4663Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleQuestionFill;
