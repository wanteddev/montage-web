import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 여러 목록을 표현합니다.
 * 키워드: 리스트, 메뉴, List, Menu
 * 속성: Outlined
 */
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
        d="M3.09998 5.7501C3.09998 5.25304 3.50292 4.8501 3.99997 4.8501H19.9999C20.497 4.8501 20.8999 5.25304 20.8999 5.7501C20.8999 6.24715 20.497 6.6501 19.9999 6.6501H3.99997C3.50292 6.6501 3.09998 6.24715 3.09998 5.7501Z"
        fill="currentColor"
      />
      <path
        d="M3.09999 12.0001C3.09999 11.503 3.50293 11.1001 3.99999 11.1001H19.9999C20.497 11.1001 20.8999 11.503 20.8999 12.0001C20.8999 12.4972 20.497 12.9001 19.9999 12.9001H3.99999C3.50293 12.9001 3.09999 12.4972 3.09999 12.0001Z"
        fill="currentColor"
      />
      <path
        d="M3.09998 18.2501C3.09998 17.753 3.50292 17.3501 3.99997 17.3501H13.7499C14.247 17.3501 14.6499 17.753 14.6499 18.2501C14.6499 18.7472 14.247 19.1501 13.7499 19.1501H3.99997C3.50292 19.1501 3.09998 18.7472 3.09998 18.2501Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
