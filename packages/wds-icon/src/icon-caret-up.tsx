import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 작은 위쪽 화살표를 표현합니다.
 * 키워드: Up, Top, Caret, 캐릿
 * 속성: Outlined
 */
const IconCaretUp = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8631 9.2932C13.2253 8.50816 12.9063 8.11564 12.5224 7.97313C12.1856 7.84815 11.8152 7.84815 11.4785 7.97313C11.0945 8.11564 10.7756 8.50816 10.1378 9.2932L8.68011 11.0873C7.66358 12.3384 7.15531 12.9639 7.15195 13.4911C7.14902 13.9495 7.35586 14.3841 7.71348 14.6709C8.12474 15.0007 8.93075 15.0007 10.5428 15.0007H13.4581C15.0701 15.0007 15.8761 15.0007 16.2874 14.6709C16.645 14.3841 16.8519 13.9495 16.8489 13.4911C16.8456 12.9639 16.3373 12.3384 15.3208 11.0873L13.8631 9.2932Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretUp;
