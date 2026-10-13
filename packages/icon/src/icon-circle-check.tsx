import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정상적으로 확인된 상태를 표현합니다.
 * 키워드: 체크, 확인, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCircleCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M16.5466 9.77594C16.8923 9.41878 16.883 8.84901 16.5259 8.50331C16.1687 8.15762 15.599 8.16691 15.2533 8.52406L10.5773 13.355L8.54751 11.2522C8.2023 10.8946 7.63255 10.8845 7.27492 11.2297C6.9173 11.5749 6.90724 12.1447 7.25244 12.5023L9.9289 15.2751C10.0984 15.4506 10.3318 15.5498 10.5758 15.55C10.8198 15.5502 11.0534 15.4513 11.2231 15.2759L16.5466 9.77594Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9 2C6.43236 2 2 6.43238 2 11.9C2 17.3676 6.43236 21.8 11.9 21.8C17.3676 21.8 21.7999 17.3676 21.7999 11.9C21.7999 6.43238 17.3676 2 11.9 2ZM3.79999 11.9C3.79999 7.42649 7.42647 3.8 11.9 3.8C16.3735 3.8 19.9999 7.42649 19.9999 11.9C19.9999 16.3735 16.3735 20 11.9 20C7.42647 20 3.79999 16.3735 3.79999 11.9Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCheck;
