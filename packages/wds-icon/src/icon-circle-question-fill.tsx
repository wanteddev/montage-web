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
          d="M2.09991 12.0001C2.09991 6.53248 6.53229 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53229 21.9001 2.09991 17.4677 2.09991 12.0001ZM11.1098 13.1165C11.0129 13.6409 11.4602 14.08 11.9935 14.08C12.526 14.08 12.9298 13.6328 13.1104 13.1319C13.3451 12.4807 13.8169 12.0841 14.2874 11.6886C14.9461 11.1348 15.6025 10.5831 15.6025 9.3375C15.6025 7.41467 14.0444 6.28226 12.0608 6.28226C10.2581 6.28226 8.89853 7.23259 8.50118 8.77528C8.36811 9.29189 8.81585 9.7327 9.34932 9.7327C9.88143 9.7327 10.2723 9.27237 10.519 8.80092C10.7842 8.2941 11.2943 8.00492 11.9848 7.99988C12.9348 8.00748 13.596 8.55469 13.596 9.4135C13.596 10.1105 13.159 10.4457 12.6454 10.8397C12.0477 11.2982 11.3464 11.8362 11.1098 13.1165ZM10.7688 16.4664C10.7612 17.1504 11.278 17.652 12 17.652C12.7068 17.652 13.2236 17.1504 13.2312 16.4664C13.2236 15.7824 12.7068 15.2808 12 15.2808C11.278 15.2808 10.7612 15.7824 10.7688 16.4664Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconCircleQuestionFill;
