import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 정보를 지울 때 사용합니다.
 * 키워드: Closed, Delete, 삭제, 제거, 닫기
 * 속성: Solid
 */
const IconCircleCloseFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.09998 12.0001C2.09998 6.53248 6.53234 2.1001 11.9999 2.1001C17.4675 2.1001 21.8999 6.53248 21.8999 12.0001C21.8999 17.4677 17.4675 21.9001 11.9999 21.9001C6.53234 21.9001 2.09998 17.4677 2.09998 12.0001ZM9.13634 7.86373C8.78487 7.51225 8.21502 7.51225 7.86355 7.86373C7.51208 8.2152 7.51208 8.78505 7.86355 9.13652L10.7271 12.0001L7.86355 14.8637C7.51208 15.2152 7.51208 15.785 7.86355 16.1365C8.21502 16.488 8.78487 16.488 9.13634 16.1365L11.9999 13.2729L14.8635 16.1365C15.215 16.488 15.7848 16.488 16.1363 16.1365C16.4878 15.785 16.4878 15.2152 16.1363 14.8637L13.2727 12.0001L16.1363 9.13652C16.4878 8.78505 16.4878 8.2152 16.1363 7.86373C15.7848 7.51225 15.215 7.51225 14.8635 7.86373L11.9999 10.7273L9.13634 7.86373Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCircleCloseFill;
