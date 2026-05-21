import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 내용을 좋아할 때 사용합니다.
 * 키워드: 하트 아이콘, 좋아요, Heart, Like, Liked, 따봉, 최고, 굿
 * 속성: Solid
 */
const IconHeartFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M7.59998 3.1001C4.16999 3.1001 1.5 5.93664 1.5 9.4001C1.5 11.04 2.09356 12.4208 3.02079 13.7026C3.93087 14.9607 5.1969 16.1683 6.58758 17.4596L6.59183 17.4635L10.3314 20.8915C10.5042 21.0499 10.6701 21.202 10.8208 21.3198C10.9863 21.4492 11.188 21.5821 11.4443 21.6605C11.8065 21.7712 12.1935 21.7712 12.5556 21.6605C12.8119 21.5821 13.0136 21.4492 13.1791 21.3198C13.3299 21.202 13.4957 21.05 13.6685 20.8915L17.4081 17.4635L17.4124 17.4596C18.803 16.1683 20.0691 14.9607 20.9791 13.7026C21.9064 12.4208 22.4999 11.04 22.4999 9.4001C22.4999 5.93664 19.8299 3.1001 16.4 3.1001C14.6575 3.1001 13.1026 3.83723 12 5.01883C10.8973 3.83723 9.34245 3.1001 7.59998 3.1001Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconHeartFill;
