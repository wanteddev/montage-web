import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 깃발을 표현합니다.
 * 키워드: 휘날림, Milestone, 마일스톤
 * 속성: Solid
 */
const IconFlagFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.14985 16.1492L5.27739 16.1067C7.4737 15.3746 9.86646 15.5071 11.9685 16.4773L12.3449 16.651C14.1475 17.4829 16.1431 17.8068 18.1163 17.5875L18.5149 17.5432C19.7303 17.4082 20.6499 16.3808 20.6499 15.1579V4.50049C20.6499 4.24449 20.5408 4.00061 20.3501 3.82988C20.1593 3.65914 19.9049 3.57773 19.6505 3.606L17.9175 3.79854C16.2702 3.98158 14.6041 3.71122 13.0992 3.01663L12.087 2.5495C9.97764 1.57593 7.57647 1.44294 5.37244 2.17761C4.16457 2.58023 3.34985 3.7106 3.34985 4.98381V15.4795C3.34953 15.4934 3.34953 15.5073 3.34985 15.5212V21.0005C3.34985 21.4975 3.7528 21.9005 4.24985 21.9005C4.74691 21.9005 5.14985 21.4975 5.14985 21.0005V16.1492Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlagFill;
