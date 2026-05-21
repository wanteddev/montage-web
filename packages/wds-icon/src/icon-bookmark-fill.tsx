import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 북마크나 저장을 표시할 때 사용합니다.
 * 키워드: 북마크, Bookmark, Save, 저장, 추가, Add
 * 속성: Solid
 */
const IconBookmarkFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M8.16444 2.59985C7.63458 2.59984 7.18338 2.59983 6.81296 2.63009C6.4238 2.66189 6.04521 2.73152 5.68328 2.91594C5.13761 3.19397 4.69397 3.63761 4.41594 4.18328C4.23152 4.54522 4.16189 4.92381 4.13009 5.31297C4.09983 5.6834 4.09984 6.13457 4.09985 6.66442V21.4999C4.09985 21.8249 4.27517 22.1248 4.55848 22.2842C4.84178 22.4436 5.18905 22.4379 5.46693 22.2692L11.9998 18.3027L18.5327 22.2692C18.8106 22.4379 19.1579 22.4436 19.4412 22.2842C19.7245 22.1248 19.8998 21.8249 19.8998 21.4999V6.66445C19.8998 6.13458 19.8998 5.6834 19.8696 5.31297C19.8378 4.92381 19.7681 4.54522 19.5837 4.18328C19.3057 3.63761 18.862 3.19397 18.3164 2.91594C17.9544 2.73152 17.5758 2.66189 17.1867 2.63009C16.8163 2.59983 16.3651 2.59984 15.8352 2.59985H8.16444Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBookmarkFill;
