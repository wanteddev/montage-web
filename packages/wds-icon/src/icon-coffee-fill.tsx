import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 커피를 표현합니다.
 * 키워드: Coffee, Coffeechat, 커피챗
 * 속성: Solid
 */
const IconCoffeeFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M5.8675 3.09522H16.1342C16.5256 3.0952 16.8722 3.09518 17.1593 3.11864C17.4651 3.14363 17.782 3.19964 18.0904 3.3568C18.542 3.5869 18.9092 3.95405 19.1392 4.40564C19.2563 4.63528 19.3172 4.86957 19.351 5.10049H19.7499C22.0419 5.10049 23.8999 6.95851 23.8999 9.25049C23.8999 11.5425 22.0419 13.4005 19.7499 13.4005H18.4399C17.0343 16.0732 14.2307 17.8962 11.0012 17.8962C6.36191 17.8962 2.60083 14.1343 2.60083 9.49522V6.36188C2.60081 5.97038 2.6008 5.62388 2.62426 5.33673C2.64924 5.03095 2.70525 4.7141 2.86242 4.40564C3.09251 3.95405 3.45967 3.5869 3.91126 3.3568C4.21971 3.19964 4.53656 3.14363 4.84235 3.11864C5.12949 3.09518 5.47602 3.0952 5.8675 3.09522ZM19.7499 6.90049H19.4008V9.49522C19.4008 10.2222 19.3085 10.9277 19.1349 11.6005H19.7499C21.0477 11.6005 22.0999 10.5484 22.0999 9.25049C22.0999 7.95262 21.0477 6.90049 19.7499 6.90049Z"
        fill="currentColor"
      />
      <path
        d="M4.75098 20.0995C4.25392 20.0995 3.85098 20.5025 3.85098 20.9995C3.85098 21.4966 4.25392 21.8995 4.75098 21.8995H17.751C18.248 21.8995 18.651 21.4966 18.651 20.9995C18.651 20.5025 18.248 20.0995 17.751 20.0995H4.75098Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCoffeeFill;
