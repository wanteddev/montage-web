import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M7.94433 3.40825L20.2245 9.80067C20.635 10.0144 20.9968 10.2027 21.2704 10.3785C21.5426 10.5534 21.8721 10.8026 22.0559 11.1967C22.2932 11.7057 22.2932 12.2936 22.0559 12.8026C21.8721 13.1967 21.5426 13.4459 21.2704 13.6208C20.9968 13.7966 20.635 13.9849 20.2245 14.1986L7.94433 20.591C7.45364 20.8465 7.03204 21.066 6.68888 21.2074C6.36165 21.3423 5.91534 21.4929 5.44612 21.388C4.85868 21.2567 4.3682 20.8548 4.12398 20.3046C3.92891 19.8652 3.98878 19.398 4.0567 19.0506C4.12794 18.6863 4.26025 18.2298 4.41426 17.6985L5.80499 12.8996H12.9997C13.4967 12.8996 13.8997 12.4967 13.8997 11.9996C13.8997 11.5026 13.4967 11.0996 12.9997 11.0996H5.80499L4.41426 6.30083C4.26025 5.76947 4.12794 5.31298 4.0567 4.94869C3.98878 4.60133 3.92891 4.13414 4.12398 3.69469C4.3682 3.14451 4.85868 2.74261 5.44612 2.61131C5.91534 2.50643 6.36165 2.65698 6.68888 2.79186C7.03206 2.93332 7.45362 3.15279 7.94433 3.40825Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconSendFill;
