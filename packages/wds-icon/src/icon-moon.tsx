import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 달을 표현합니다.
 * 키워드: 다크모드, Dark, Night, Night Time, Weather
 * 속성: Outlined
 */
const IconMoon = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M9.76125 2.54296C10.0163 2.81236 10.08 3.21069 9.92151 3.54615C9.42701 4.59301 9.15004 5.76348 9.15004 7.00115C9.15004 11.4747 12.7765 15.1011 17.25 15.1011C18.3318 15.1011 19.3619 14.8896 20.3029 14.5064C20.6465 14.3665 21.0408 14.4517 21.2959 14.7211C21.551 14.9905 21.6146 15.3888 21.4561 15.7243C19.8722 19.0775 16.4583 21.4005 12.5 21.4005C7.03242 21.4005 2.60004 16.9681 2.60004 11.5005C2.60004 7.35162 5.15192 3.80089 8.76829 2.32821C9.1119 2.18829 9.50617 2.27355 9.76125 2.54296ZM7.53216 5.10214C5.62559 6.58467 4.40004 8.9001 4.40004 11.5005C4.40004 15.974 8.02653 19.6005 12.5 19.6005C14.943 19.6005 17.1344 18.519 18.6202 16.807C18.1721 16.8691 17.7147 16.9011 17.25 16.9011C11.7824 16.9011 7.35004 12.4688 7.35004 7.00115C7.35004 6.35203 7.41262 5.71707 7.53216 5.10214Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMoon;
