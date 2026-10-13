import { Box } from '@montage-ui/engine';
import { forwardRef } from 'react';

import type { SxProp } from '@montage-ui/engine';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  sx?: SxProp;
};

/**
 * 댓글이나 대화를 추가할 때 사용합니다.
 * 키워드: Conversation, Comment, Add, Bubble, 추가, 코멘트, 대화, 댓글
 * 속성: Solid
 */
const IconBubblePlusFill = forwardRef<SVGSVGElement, Props>((props, ref) => {
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
        d="M2.3501 12C2.3501 6.67043 6.67053 2.34998 12.0001 2.34998C17.3296 2.34998 21.65 6.67043 21.65 12C21.65 13.5383 21.2894 14.9947 20.6476 16.2871L21.1419 18.0995C21.2538 18.5097 21.3536 18.8757 21.4067 19.1762C21.4604 19.4808 21.4971 19.8668 21.3498 20.2525C21.1569 20.7578 20.7578 21.1569 20.2526 21.3498C19.8669 21.497 19.4808 21.4604 19.1763 21.4066C18.8757 21.3535 18.5098 21.2537 18.0996 21.1418L16.2872 20.6475C14.9948 21.2894 13.5384 21.65 12.0001 21.65C6.67053 21.65 2.3501 17.3295 2.3501 12ZM12.9005 8.00012C12.9005 7.50307 12.4976 7.10012 12.0005 7.10012C11.5035 7.10012 11.1005 7.50307 11.1005 8.00012V11.1001H8.00053C7.50348 11.1001 7.10054 11.5031 7.10054 12.0001C7.10054 12.4972 7.50348 12.9001 8.00053 12.9001H11.1005V16.0001C11.1005 16.4972 11.5035 16.9001 12.0005 16.9001C12.4976 16.9001 12.9005 16.4972 12.9005 16.0001V12.9001H16.0005C16.4976 12.9001 16.9005 12.4972 16.9005 12.0001C16.9005 11.5031 16.4976 11.1001 16.0005 11.1001H12.9005V8.00012Z"
        fill="currentColor"
      />
    </Box>
  );
});

export default IconBubblePlusFill;
