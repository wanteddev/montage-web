import { Box } from '@wanteddev/wds-engine';
import { forwardRef } from 'react';

import type { SxProp } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 개인정보를 가릴 때 사용합니다.
 * 키워드: 가려진 정보, 뷰 슬래시, 안보임, 안 보임, 눈알 슬래시, View Slash, Can&Amp;#39;T See, Unseen, Slashed Eye, Hidden Eye
 * 속성: Solid
 */
const IconEyeSlashFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M4.63652 4.11321C4.28505 3.76174 3.7152 3.76174 3.36373 4.11321C3.01225 4.46469 3.01225 5.03453 3.36373 5.38601L5.06899 7.09127C3.69521 8.22593 2.6042 9.69077 1.91751 11.3643C1.75064 11.7709 1.75064 12.2274 1.91751 12.634C3.54627 16.6034 7.44955 19.3988 12.0058 19.3988C13.5839 19.3988 15.0837 19.0634 16.4378 18.4601L18.3637 20.386C18.7152 20.7375 19.285 20.7375 19.6365 20.386C19.988 20.0345 19.988 19.4647 19.6365 19.1132L4.63652 4.11321ZM13.5553 15.5775L12.0763 14.0986C12.051 14.0995 12.0256 14.1 12 14.1C10.8402 14.1 9.90002 13.1598 9.90002 12C9.90002 11.9744 9.90047 11.949 9.90138 11.9237L8.42246 10.4447C8.21504 10.9212 8.10002 11.4472 8.10002 12C8.10002 14.1539 9.84611 15.9 12 15.9C12.5528 15.9 13.0788 15.785 13.5553 15.5775Z"
        fill="currentColor"
      />
      <path
        d="M15.8189 12.7951L19.4679 16.4441C20.5954 15.3848 21.4973 14.0882 22.094 12.634C22.2609 12.2274 22.2609 11.7709 22.094 11.3643C20.4652 7.39494 16.562 4.59946 12.0058 4.59946C10.6962 4.59946 9.44066 4.83039 8.27752 5.25374L11.2049 8.18109C11.4616 8.12792 11.7275 8.09998 12 8.09998C14.1539 8.09998 15.9 9.84607 15.9 12C15.9 12.2725 15.8721 12.5384 15.8189 12.7951Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconEyeSlashFill;
