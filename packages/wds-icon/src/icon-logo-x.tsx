import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * X 로고를 표현합니다.
 * 키워드: 엑스, Twitter, 트위터
 * 속성: Outlined
 */
const IconLogoX = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M17.1761 3.90039H19.9362L13.9061 10.7625L21 20.1004H15.4456L11.0951 14.437L6.11723 20.1004H3.35544L9.80517 12.7605L3 3.90039H8.69545L12.6279 9.07691L17.1761 3.90039ZM16.2073 18.4555H17.7368L7.86441 5.45891H6.2232L16.2073 18.4555Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoX;
