import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 메시지를 표현합니다.
 * 키워드: 메시지
 * 속성: Solid
 */
const IconMessageFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.3501 12.0001C2.3501 6.67055 6.67053 2.3501 12.0001 2.3501C17.3296 2.3501 21.65 6.67055 21.65 12.0001C21.65 13.5384 21.2894 14.9948 20.6476 16.2873L21.1419 18.0997C21.2537 18.5098 21.3536 18.8758 21.4066 19.1763C21.4604 19.4809 21.4971 19.867 21.3498 20.2526C21.1569 20.7579 20.7578 21.157 20.2525 21.3499C19.8669 21.4971 19.4808 21.4605 19.1762 21.4067C18.8757 21.3537 18.5098 21.2538 18.0996 21.1419L16.2872 20.6476C14.9948 21.2895 13.5384 21.6501 12.0001 21.6501C6.67053 21.6501 2.3501 17.3296 2.3501 12.0001ZM7.09974 10C7.09974 9.50294 7.50268 9.1 7.99973 9.1H15.9997C16.4968 9.1 16.8997 9.50294 16.8997 10C16.8997 10.4971 16.4968 10.9 15.9997 10.9H7.99973C7.50268 10.9 7.09974 10.4971 7.09974 10ZM7.09974 14C7.09974 13.5029 7.50268 13.1 7.99973 13.1H12.7497C13.2468 13.1 13.6497 13.5029 13.6497 14C13.6497 14.4971 13.2468 14.9 12.7497 14.9H7.99973C7.50268 14.9 7.09974 14.4971 7.09974 14Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconMessageFill;
