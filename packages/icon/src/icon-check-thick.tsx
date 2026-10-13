import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 선택 여부를 표시할 때 사용합니다.
 * 키워드: Thick, 확인, 체크, 첵, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCheckThick = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.6699 6.58096C20.1776 7.08864 20.1776 7.91175 19.6699 8.41943L10.6699 17.4194C10.1622 17.9271 9.33913 17.9271 8.83144 17.4194L4.33144 12.9194C3.82376 12.4118 3.82376 11.5886 4.33144 11.081C4.83913 10.5733 5.66224 10.5733 6.16992 11.081L9.75068 14.6617L17.8314 6.58096C18.3391 6.07327 19.1622 6.07327 19.6699 6.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheckThick;
