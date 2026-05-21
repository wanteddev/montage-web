import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 표시할 때 사용합니다.
 * 키워드: Additional Information, Info
 * 속성: Outlined
 */
const IconCircleInfo = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.9999 8C12.9999 8.55228 12.5522 9 11.9999 9C11.4476 9 10.9999 8.55228 10.9999 8C10.9999 7.44772 11.4476 7 11.9999 7C12.5522 7 12.9999 7.44772 12.9999 8Z"
        fill="currentColor"
      />
      <path
        d="M12.9 11.5C12.9 11.0029 12.497 10.6 12 10.6C11.5029 10.6 11.1 11.0029 11.1 11.5V16C11.1 16.4971 11.5029 16.9 12 16.9C12.497 16.9 12.9 16.4971 12.9 16V11.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.09995 12.0001C2.09995 6.53248 6.5323 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.5323 21.9001 2.09995 17.4677 2.09995 12.0001ZM11.9999 3.9001C7.52641 3.9001 3.89994 7.52659 3.89994 12.0001C3.89994 16.4736 7.52641 20.1001 11.9999 20.1001C16.4734 20.1001 20.0999 16.4736 20.0999 12.0001C20.0999 7.52659 16.4734 3.9001 11.9999 3.9001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleInfo;
