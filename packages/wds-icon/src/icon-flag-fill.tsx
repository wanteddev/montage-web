import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M5.1501 16.1492L5.27763 16.1067C7.47394 15.3746 9.86671 15.5071 11.9687 16.4773L12.3451 16.651C14.1477 17.4829 16.1433 17.8068 18.1165 17.5875L18.5151 17.5432C19.7306 17.4082 20.6501 16.3808 20.6501 15.1579V4.50049C20.6501 4.24449 20.5411 4.00061 20.3503 3.82988C20.1596 3.65914 19.9051 3.57773 19.6507 3.606L17.9178 3.79854C16.2704 3.98158 14.6043 3.71122 13.0994 3.01663L12.0873 2.5495C9.97788 1.57593 7.57671 1.44294 5.37269 2.17761C4.16482 2.58023 3.3501 3.7106 3.3501 4.98381V15.4795C3.34977 15.4934 3.34977 15.5073 3.3501 15.5212V21.0005C3.3501 21.4975 3.75304 21.9005 4.2501 21.9005C4.74715 21.9005 5.1501 21.4975 5.1501 21.0005V16.1492Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFlagFill;
