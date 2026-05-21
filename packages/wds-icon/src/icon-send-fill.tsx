import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 입력한 내용을 전송할 때 사용합니다.
 * 키워드: Message, Messenger, Sent, Paper Plane, 종이비행기, 보내기
 * 속성: Solid
 */
const IconSendFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.94451 3.40825L20.2247 9.80067C20.6352 10.0144 20.997 10.2027 21.2705 10.3785C21.5428 10.5534 21.8723 10.8026 22.0561 11.1967C22.2934 11.7057 22.2934 12.2936 22.0561 12.8026C21.8723 13.1967 21.5428 13.4459 21.2705 13.6208C20.997 13.7966 20.6352 13.9849 20.2247 14.1986L7.94451 20.591C7.45383 20.8465 7.03223 21.066 6.68906 21.2074C6.36184 21.3423 5.91553 21.4929 5.44631 21.388C4.85886 21.2567 4.36838 20.8548 4.12416 20.3046C3.92909 19.8652 3.98896 19.398 4.05689 19.0506C4.12812 18.6863 4.26043 18.2298 4.41444 17.6985L5.80517 12.8996H12.9998C13.4969 12.8996 13.8998 12.4967 13.8998 11.9996C13.8998 11.5026 13.4969 11.0996 12.9998 11.0996H5.80517L4.41445 6.30083C4.26044 5.76947 4.12812 5.31298 4.05689 4.94869C3.98896 4.60133 3.92909 4.13414 4.12416 3.69469C4.36838 3.14451 4.85886 2.74261 5.44631 2.61131C5.91553 2.50643 6.36184 2.65698 6.68906 2.79186C7.03224 2.93332 7.45381 3.15279 7.94451 3.40825Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSendFill;
