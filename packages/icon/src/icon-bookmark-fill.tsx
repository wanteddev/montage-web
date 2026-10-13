import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
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
        d="M8.16468 2.59985C7.63483 2.59984 7.18363 2.59983 6.8132 2.63009C6.42404 2.66189 6.04545 2.73152 5.68352 2.91594C5.13785 3.19397 4.69421 3.63761 4.41618 4.18328C4.23177 4.54522 4.16213 4.92381 4.13034 5.31297C4.10007 5.6834 4.10008 6.13457 4.1001 6.66442V21.4999C4.1001 21.8249 4.27541 22.1248 4.55872 22.2842C4.84203 22.4436 5.18929 22.4379 5.46717 22.2692L12.0001 18.3027L18.533 22.2692C18.8108 22.4379 19.1581 22.4436 19.4414 22.2842C19.7247 22.1248 19.9 21.8249 19.9 21.4999V6.66445C19.9001 6.13458 19.9001 5.6834 19.8698 5.31297C19.838 4.92381 19.7684 4.54522 19.584 4.18328C19.3059 3.63761 18.8623 3.19397 18.3166 2.91594C17.9547 2.73152 17.5761 2.66189 17.1869 2.63009C16.8165 2.59983 16.3653 2.59984 15.8355 2.59985H8.16468Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBookmarkFill;
