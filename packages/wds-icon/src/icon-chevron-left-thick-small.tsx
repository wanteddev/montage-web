import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 왼쪽 꺾쇠를 표현합니다. 여백, 두께, 사이즈를 조정할 수 있습니다.
 * 키워드: Thick, 꺾쇠, 뒤로가기, Chevron, Back, Left, Small
 * 속성: Outlined
 */
const IconChevronLeftThickSmall = forwardRef<SVGSVGElement, Props>(
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
          d="M15.4195 4.58071C15.9271 5.08839 15.9271 5.91151 15.4195 6.41919L9.8387 12L15.4195 17.5807C15.9271 18.0884 15.9271 18.9115 15.4195 19.4192C14.9118 19.9269 14.0887 19.9269 13.581 19.4192L7.08099 12.9192C6.57331 12.4115 6.57331 11.5884 7.08099 11.0807L13.581 4.58071C14.0887 4.07303 14.9118 4.07303 15.4195 4.58071Z"
          fill="currentColor"
        />
      </Box>
    );
  },
);

export default IconChevronLeftThickSmall;
