import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 선택 여부를 표시할 때 사용합니다.
 * 키워드: 확인, 체크, 첵, Check, Checked, Confirm
 * 속성: Outlined
 */
const IconCheck = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M19.3863 6.86346C19.7378 7.21493 19.7378 7.78478 19.3863 8.13625L10.3863 17.1362C10.0349 17.4877 9.46503 17.4877 9.11356 17.1362L4.61358 12.6362C4.26211 12.2848 4.26211 11.7149 4.61358 11.3635C4.96505 11.012 5.5349 11.012 5.88637 11.3635L9.74995 15.2271L18.1135 6.86346C18.465 6.51199 19.0348 6.51199 19.3863 6.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconCheck;
