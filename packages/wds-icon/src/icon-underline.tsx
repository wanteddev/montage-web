import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 텍스트의 밑줄을 표현합니다.
 * 키워드: 강조, 밑줄, Underline, Underscore
 * 속성: Outlined
 */
const IconUnderline = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9984 17.8287C8.10044 17.8287 5.51743 14.9639 5.51743 10.6902V4.03321C5.51743 3.46258 5.98001 3 6.55064 3C7.12126 3 7.58384 3.46258 7.58384 4.03321V10.6902C7.58384 13.7898 9.34498 15.8562 11.9984 15.8562C14.6519 15.8562 16.413 13.7898 16.413 10.6902V4.03321C16.413 3.46258 16.8756 3 17.4462 3C18.0169 3 18.4794 3.46258 18.4794 4.03321V10.6902C18.4794 14.9639 15.8964 17.8287 11.9984 17.8287Z"
        fill="currentColor"
      />
      <path
        d="M5.00009 20.1C4.50304 20.1 4.1001 20.5029 4.1001 21C4.1001 21.4971 4.50304 21.9 5.00009 21.9H19C19.4971 21.9 19.9 21.4971 19.9 21C19.9 20.5029 19.4971 20.1 19 20.1H5.00009Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconUnderline;
