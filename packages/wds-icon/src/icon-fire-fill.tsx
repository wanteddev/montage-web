import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 불꽃을 표현합니다.
 * 키워드: Featured, Hot, 인기
 * 속성: Solid
 */
const IconFireFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.6086 2.41218C12.2336 1.42782 13.6097 1.22151 14.4833 2.03486C18.5797 5.84912 21.1493 9.50889 21.1493 13.6009C21.1493 18.5163 17.3279 22.4009 11.9993 22.4009C9.36677 22.4009 7.07295 21.5024 5.43187 19.9247C3.78869 18.345 2.84937 16.1309 2.84937 13.6009C2.84937 10.8753 3.96077 8.26353 5.85929 6.26287C6.4875 5.60085 7.4877 5.6296 8.11057 6.19018L8.81015 6.81981L11.6086 2.41218ZM8.49935 15.6005C8.49935 17.5005 10.0493 19.0005 11.9993 19.0005C13.9493 19.0005 15.4993 17.5005 15.4993 15.6005C15.4993 13.7005 13.9493 12.2005 11.9993 10.5005C10.0493 12.2005 8.49935 13.7005 8.49935 15.6005Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconFireFill;
