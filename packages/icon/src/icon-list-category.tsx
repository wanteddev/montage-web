import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M3.1001 5.7501C3.1001 5.25304 3.50304 4.8501 4.00009 4.8501H20C20.4971 4.8501 20.9 5.25304 20.9 5.7501C20.9 6.24715 20.4971 6.6501 20 6.6501H4.00009C3.50304 6.6501 3.1001 6.24715 3.1001 5.7501Z"
        fill="currentColor"
      />
      <path
        d="M3.10011 12.0001C3.10011 11.503 3.50306 11.1001 4.00011 11.1001H20C20.4971 11.1001 20.9 11.503 20.9 12.0001C20.9 12.4972 20.4971 12.9001 20 12.9001H4.00011C3.50306 12.9001 3.10011 12.4972 3.10011 12.0001Z"
        fill="currentColor"
      />
      <path
        d="M3.1001 18.2501C3.1001 17.753 3.50304 17.3501 4.00009 17.3501H13.7501C14.2471 17.3501 14.6501 17.753 14.6501 18.2501C14.6501 18.7472 14.2471 19.1501 13.7501 19.1501H4.00009C3.50304 19.1501 3.1001 18.7472 3.1001 18.2501Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconListCategory;
