import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
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
        d="M19.6697 6.58096C20.1774 7.08864 20.1774 7.91175 19.6697 8.41943L10.6697 17.4194C10.1621 17.9271 9.33894 17.9271 8.83126 17.4194L4.33126 12.9194C3.82358 12.4118 3.82358 11.5886 4.33126 11.081C4.83894 10.5733 5.66206 10.5733 6.16974 11.081L9.7505 14.6617L17.8313 6.58096C18.3389 6.07327 19.1621 6.07327 19.6697 6.58096Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheckThick;
