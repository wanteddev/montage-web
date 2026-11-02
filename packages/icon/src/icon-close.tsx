import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 요소를 닫을 때 사용합니다.
 * 키워드: 닫기, Close
 * 속성: Outlined
 */
const IconClose = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.8637 4.86346C5.21517 4.51199 5.78502 4.51199 6.13649 4.86346L12.0001 10.7271L17.8637 4.86346C18.2151 4.51199 18.785 4.51199 19.1364 4.86346C19.4879 5.21493 19.4879 5.78478 19.1365 6.13625L13.2729 11.9999L19.1365 17.8635C19.4879 18.2149 19.4879 18.7848 19.1364 19.1363C18.785 19.4877 18.2151 19.4877 17.8637 19.1363L12.0001 13.2727L6.13649 19.1363C5.78502 19.4877 5.21517 19.4877 4.8637 19.1363C4.51223 18.7848 4.51223 18.2149 4.8637 17.8635L10.7273 11.9999L4.8637 6.13625C4.51223 5.78478 4.51223 5.21493 4.8637 4.86346Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconClose;
