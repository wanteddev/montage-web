import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 오른쪽으로 큰 상태 변화를 표현합니다.
 * 키워드: Thick, 오른쪽 꺾쇠, 굵은, 얇은, 작은, 큰, Double Chevron, Right, Small
 * 속성: Outlined
 */
const IconChevronDoubleRightThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M4.08071 6.42334C3.57303 5.91566 3.57303 5.09254 4.08071 4.58486C4.58839 4.07718 5.41151 4.07718 5.91919 4.58486L12.4192 11.0849C12.663 11.3287 12.8 11.6593 12.8 12.0041C12.8 12.3489 12.663 12.6795 12.4192 12.9233L5.91919 19.4233C5.41151 19.931 4.5884 19.931 4.08071 19.4233C3.57303 18.9157 3.57303 18.0925 4.08071 17.5849L9.66148 12.0041L4.08071 6.42334ZM12.0808 6.42334C11.5732 5.91566 11.5732 5.09254 12.0808 4.58486C12.5885 4.07718 13.4116 4.07718 13.9193 4.58486L20.4193 11.0849C20.6631 11.3287 20.8001 11.6593 20.8001 12.0041C20.8001 12.3489 20.6631 12.6795 20.4193 12.9233L13.9193 19.4233C13.4116 19.931 12.5885 19.931 12.0808 19.4233C11.5732 18.9157 11.5732 18.0925 12.0808 17.5849L17.6616 12.0041L12.0808 6.42334Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronDoubleRightThickSmall;
