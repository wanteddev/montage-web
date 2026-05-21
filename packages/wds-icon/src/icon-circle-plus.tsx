import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 추가할 때 사용합니다.
 * 키워드: 플러스, 추가, Add, Plus
 * 속성: Outlined
 */
const IconCirclePlus = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M12.8999 8C12.8999 7.50294 12.497 7.1 11.9999 7.1C11.5029 7.1 11.0999 7.50294 11.0999 8V11.1H7.99995C7.5029 11.1 7.09996 11.5029 7.09996 12C7.09996 12.4971 7.5029 12.9 7.99995 12.9H11.0999V16C11.0999 16.4971 11.5029 16.9 11.9999 16.9C12.497 16.9 12.8999 16.4971 12.8999 16V12.9H15.9999C16.497 12.9 16.8999 12.4971 16.8999 12C16.8999 11.5029 16.497 11.1 15.9999 11.1H12.8999V8Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9999 2.1001C6.53231 2.1001 2.09995 6.53248 2.09995 12.0001C2.09995 17.4677 6.53231 21.9001 11.9999 21.9001C17.4675 21.9001 21.8999 17.4677 21.8999 12.0001C21.8999 6.53248 17.4675 2.1001 11.9999 2.1001ZM3.89994 12.0001C3.89994 7.52659 7.52642 3.9001 11.9999 3.9001C16.4734 3.9001 20.0999 7.52659 20.0999 12.0001C20.0999 16.4736 16.4734 20.1001 11.9999 20.1001C7.52642 20.1001 3.89994 16.4736 3.89994 12.0001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCirclePlus;
