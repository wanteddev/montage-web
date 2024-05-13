import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

const IconLogoGoogleColor = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M21.504 12.2255C21.504 11.5237 21.4413 10.8483 21.3236 10.2004H12V14.0295H17.3284C17.0985 15.267 16.4011 16.3164 15.3528 17.0182V19.502H18.5516C20.4238 17.7783 21.504 15.2406 21.504 12.2255Z"
        fill="#3D82F0"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0003 21.9004C14.6733 21.9004 16.914 21.0138 18.5519 19.5023L15.3531 17.0174C14.4665 17.6114 13.3324 17.9623 12.0003 17.9623C9.42185 17.9623 7.23945 16.221 6.46065 13.8813H3.15295V16.4465C4.78205 19.6817 8.13045 21.9004 12.0003 21.9004Z"
        fill="#31A752"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.46038 13.8814C6.26238 13.2874 6.15018 12.6527 6.15018 12.0004C6.15018 11.3481 6.26238 10.7134 6.46038 10.1194V7.5542H3.15268C2.48278 8.8907 2.09998 10.4032 2.09998 12.0004C2.09998 13.5976 2.48278 15.1101 3.15268 16.4466L6.46038 13.8814Z"
        fill="#F9BA00"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0003 6.03798C13.4534 6.03798 14.7591 6.53738 15.7843 7.51858L18.6245 4.67948C16.9096 3.08118 14.6689 2.09998 12.0003 2.09998C8.13045 2.09998 4.78205 4.31868 3.15295 7.55488L6.46065 10.119C7.23945 7.77928 9.42185 6.03798 12.0003 6.03798Z"
        fill="#E64234"
      />
    </Box>
  );
});

export default IconLogoGoogleColor;
