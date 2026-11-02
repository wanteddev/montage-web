import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 작은 아래쪽 화살표를 표현합니다.
 * 키워드: Bottom, Down, Caret, 캐릿
 * 속성: Outlined
 */
const IconCaretDown = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M13.8626 14.7075C13.2247 15.4925 12.9058 15.885 12.5218 16.0276C12.1851 16.1525 11.8147 16.1525 11.478 16.0276C11.094 15.885 10.7751 15.4925 10.1372 14.7075L8.67956 12.9134C7.66303 11.6623 7.15476 11.0367 7.1514 10.5096C7.14847 10.0512 7.35531 9.61661 7.71293 9.32982C8.12419 9 8.9302 9 10.5422 9H13.4576C15.0696 9 15.8756 9 16.2869 9.32982C16.6445 9.61661 16.8513 10.0512 16.8484 10.5096C16.845 11.0367 16.3368 11.6623 15.3202 12.9134L13.8626 14.7075Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCaretDown;
