import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 페이스북 로고를 표현합니다.
 * 키워드: 페이스북 로고, FB, Facebook, Meta, Logo, 메타
 * 속성: Outlined
 */
const IconLogoFacebook = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M11.9999 2.09961C6.53516 2.09961 2.09998 6.53481 2.09998 11.9996C2.09998 16.9397 5.72336 21.0383 10.4555 21.7808V14.8607H7.94095V11.9996H10.4555V9.82161C10.4555 7.33671 11.9306 5.97051 14.1977 5.97051C15.2768 5.97051 16.4153 6.16851 16.4153 6.16851V8.60391H15.1679C13.9403 8.60391 13.5542 9.36621 13.5542 10.1483V12.0095H16.2965L15.8609 14.8706H13.5542V21.7907C18.2864 21.0482 21.8999 16.9397 21.8999 11.9996C21.8999 6.53481 17.4746 2.10951 12.0098 2.10951L11.9999 2.09961Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconLogoFacebook;
