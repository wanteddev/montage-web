import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 메뉴를 표시할 때 사용합니다.
 * 키워드: Thick, Hamburger, 햄버거, 삼선 메뉴, Menu, Thick
 * 속성: Outlined
 */
const IconMenuThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.00021 4.49902C3.30986 4.49902 2.75021 5.05867 2.75021 5.74902C2.75021 6.43938 3.30986 6.99902 4.00021 6.99902H20.0001C20.6905 6.99902 21.2501 6.43938 21.2501 5.74902C21.2501 5.05867 20.6905 4.49902 20.0001 4.49902H4.00021Z"
        fill="currentColor"
      />
      <path
        d="M2.75023 11.9992C2.75023 11.3089 3.30987 10.7492 4.00022 10.7492H20.0002C20.6905 10.7492 21.2502 11.3089 21.2502 11.9992C21.2502 12.6896 20.6905 13.2492 20.0002 13.2492H4.00022C3.30987 13.2492 2.75023 12.6896 2.75023 11.9992Z"
        fill="currentColor"
      />
      <path
        d="M2.75022 18.2489C2.75022 17.5586 3.30986 16.9989 4.00022 16.9989H20.0002C20.6905 16.9989 21.2502 17.5586 21.2502 18.2489C21.2502 18.9393 20.6905 19.4989 20.0002 19.4989H4.00022C3.30986 19.4989 2.75022 18.9393 2.75022 18.2489Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMenuThick;
